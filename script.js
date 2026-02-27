(function () {
  // array principal pra guardar os participantes.
  var participants = [];

  // função helper pra criar elemento html mais rápido.
  function createElement(tag, options) {
    var element = document.createElement(tag);
    if (!options) return element;

    if (options.id) element.id = options.id;
    if (options.className) element.className = options.className;
    if (typeof options.text === 'string') element.textContent = options.text;

    if (options.attrs) {
      Object.keys(options.attrs).forEach(function (attr) {
        element.setAttribute(attr, options.attrs[attr]);
      });
    }

    return element;
  }

  // atualiza a data/hora que fica no topo.
  function updateDateTime() {
    var dateTarget = document.getElementById('currentDateTime');
    if (!dateTarget) return;

    var now = new Date();
    dateTarget.textContent = 'Data e hora atual: ' + now.toLocaleString('pt-BR');
  }

  // monta o formulário inteiro via js (parte dinâmica).
  function buildDynamicForm() {
    var root = document.getElementById('formRoot');
    if (!root) return;

    var form = createElement('form', {
      id: 'participantForm',
      className: 'participant-form',
      attrs: {
        action: '#',
        method: 'post',
        novalidate: 'novalidate',
        'aria-describedby': 'formError'
      }
    });

    // campo nome (obrigatório)
    var nameField = createElement('div', { className: 'field full' });
    var nameLabel = createElement('label', { text: 'Nome', attrs: { for: 'name' } });
    var nameInput = createElement('input', {
      id: 'name',
      attrs: {
        name: 'name',
        type: 'text',
        required: 'required',
        autocomplete: 'name'
      }
    });
    nameField.appendChild(nameLabel);
    nameField.appendChild(nameInput);

    // campo e-mail (obrigatório)
    var emailField = createElement('div', { className: 'field full' });
    var emailLabel = createElement('label', { text: 'E-mail', attrs: { for: 'email' } });
    var emailInput = createElement('input', {
      id: 'email',
      attrs: {
        name: 'email',
        type: 'email',
        required: 'required',
        autocomplete: 'email'
      }
    });
    emailField.appendChild(emailLabel);
    emailField.appendChild(emailInput);

    // checkbox de presença confirmada
    var presenceField = createElement('div', { className: 'field checkbox-field full' });
    var presenceInput = createElement('input', {
      id: 'presence',
      attrs: {
        name: 'presence',
        type: 'checkbox'
      }
    });
    var presenceLabel = createElement('label', {
      text: 'Presença confirmada',
      attrs: { for: 'presence' }
    });
    presenceField.appendChild(presenceInput);
    presenceField.appendChild(presenceLabel);

    // select do tipo de ingresso
    var ticketField = createElement('div', { className: 'field full' });
    var ticketLabel = createElement('label', {
      text: 'Tipo de ingresso',
      attrs: { for: 'ticketType' }
    });
    var ticketSelect = createElement('select', {
      id: 'ticketType',
      attrs: { name: 'ticketType', required: 'required' }
    });

    ['Padrão', 'VIP', 'Convidado'].forEach(function (optionText) {
      var option = createElement('option', { text: optionText, attrs: { value: optionText } });
      ticketSelect.appendChild(option);
    });
    ticketField.appendChild(ticketLabel);
    ticketField.appendChild(ticketSelect);

    // checkbox de novidades (abre campo extra)
    var newsField = createElement('div', { className: 'field checkbox-field full' });
    var newsInput = createElement('input', {
      id: 'news',
      attrs: {
        name: 'news',
        type: 'checkbox',
        'aria-controls': 'topicsField',
        'aria-expanded': 'false'
      }
    });
    var newsLabel = createElement('label', {
      text: 'Deseja receber novidades do evento?',
      attrs: { for: 'news' }
    });
    newsField.appendChild(newsInput);
    newsField.appendChild(newsLabel);

    // esse fieldset começa escondido e só abre se marcar novidades
    var topicsField = createElement('fieldset', {
      id: 'topicsField',
      className: 'topics-group full',
      attrs: { hidden: 'hidden', 'aria-hidden': 'true' }
    });
    var topicsLegend = createElement('legend', { text: 'Qual assunto te interessa?' });
    var topicsOptions = createElement('div', { className: 'topics-options' });
    ['Palestras', 'Networking', 'Workshops', 'Ofertas de Ingressos'].forEach(function (topic, index) {
      var wrapper = createElement('div', { className: 'checkbox-field' });
      var checkboxId = 'topic-' + index;
      var checkbox = createElement('input', {
        id: checkboxId,
        attrs: { type: 'checkbox', name: 'topics', value: topic }
      });
      var label = createElement('label', { text: topic, attrs: { for: checkboxId } });
      wrapper.appendChild(checkbox);
      wrapper.appendChild(label);
      topicsOptions.appendChild(wrapper);
    });
    topicsField.appendChild(topicsLegend);
    topicsField.appendChild(topicsOptions);

    // mensagem de erro de validação
    var errorText = createElement('p', {
      id: 'formError',
      className: 'error full',
      attrs: { 'aria-live': 'assertive' }
    });

    var submitButton = createElement('button', {
      className: 'full',
      text: 'Cadastrar Participante',
      attrs: { type: 'submit' }
    });

    form.appendChild(nameField);
    form.appendChild(emailField);
    form.appendChild(presenceField);
    form.appendChild(ticketField);
    form.appendChild(newsField);
    form.appendChild(topicsField);
    form.appendChild(errorText);
    form.appendChild(submitButton);

    root.appendChild(form);

    // mostra/esconde os assuntos de interesse
    newsInput.addEventListener('change', function () {
      var show = newsInput.checked;
      if (show) {
        topicsField.removeAttribute('hidden');
        topicsField.setAttribute('aria-hidden', 'false');
        newsInput.setAttribute('aria-expanded', 'true');
      } else {
        topicsField.setAttribute('hidden', 'hidden');
        topicsField.setAttribute('aria-hidden', 'true');
        newsInput.setAttribute('aria-expanded', 'false');

        var selectedTopics = topicsField.querySelectorAll('input[name="topics"]');
        selectedTopics.forEach(function (input) {
          input.checked = false;
        });
      }
    });

    // quando enviar: valida e cadastra
    form.addEventListener('submit', function (event) {
      event.preventDefault();

      var name = nameInput.value.trim();
      var email = emailInput.value.trim();
      var presence = presenceInput.checked;
      var ticketType = ticketSelect.value;
      var wantsNews = newsInput.checked;
      var topicInputs = form.querySelectorAll('input[name="topics"]:checked');
      var topics = [];

      topicInputs.forEach(function (topicInput) {
        topics.push(topicInput.value);
      });

      var isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      // validação básica dos obrigatórios
      if (!name || !email) {
        errorText.textContent = 'Preencha os campos obrigatórios: Nome e E-mail.';
        return;
      }

      if (!isEmailValid) {
        errorText.textContent = 'Digite um e-mail válido.';
        return;
      }

      errorText.textContent = '';

      // cria o objeto e joga no array
      var participant = {
        id: Date.now() + Math.floor(Math.random() * 10000),
        name: name,
        email: email,
        presence: presence,
        ticketType: ticketType,
        wantsNews: wantsNews,
        topics: topics
      };

      participants.push(participant);

      // logs pra conferir no console
      console.log('Participante cadastrado:', participant);
      console.log('Lista atual:', participants);

      // atualiza tela e limpa o form
      renderParticipants();
      form.reset();
      topicsField.setAttribute('hidden', 'hidden');
      topicsField.setAttribute('aria-hidden', 'true');
      newsInput.setAttribute('aria-expanded', 'false');
      nameInput.focus();
    });
  }

  // desenha a lista com base no array atual.
  function renderParticipants() {
    var list = document.getElementById('participantsList');
    if (!list) return;

    list.innerHTML = '';

    if (participants.length === 0) {
      var emptyItem = createElement('li', {
        className: 'participant-item',
        text: 'Nenhum participante cadastrado até o momento.'
      });
      list.appendChild(emptyItem);
      return;
    }

    participants.forEach(function (participant) {
      var item = createElement('li', { className: 'participant-item' });

      // aplica classes de destaque dependendo do tipo
      if (participant.ticketType === 'VIP') {
        item.classList.add('is-vip');
      }

      if (participant.ticketType === 'Convidado') {
        item.classList.add('is-guest');
      }

      var name = createElement('p', { text: 'Nome: ' + participant.name });
      var email = createElement('p', { text: 'E-mail: ' + participant.email });
      var presence = createElement('p', {
        text: 'Presença: ' + (participant.presence ? 'Confirmada' : 'Não confirmada')
      });
      var ticket = createElement('p', {
        className: 'type',
        text: 'Ingresso: ' + participant.ticketType
      });

      var news = createElement('p', {
        text: participant.wantsNews
          ? 'Novidades: Sim' + (participant.topics.length ? ' (' + participant.topics.join(', ') + ')' : '')
          : 'Novidades: Não'
      });

      var removeButton = createElement('button', {
        className: 'remove-btn',
        text: 'Remover',
        attrs: {
          type: 'button',
          'data-id': String(participant.id),
          'aria-label': 'Remover participante ' + participant.name
        }
      });

      item.appendChild(name);
      item.appendChild(email);
      item.appendChild(presence);
      item.appendChild(ticket);
      item.appendChild(news);
      item.appendChild(removeButton);
      list.appendChild(item);
    });
  }

  // evento de remover usando delegação de clique.
  function bindRemoveHandler() {
    var list = document.getElementById('participantsList');
    if (!list) return;

    list.addEventListener('click', function (event) {
      var target = event.target;
      if (!(target instanceof HTMLButtonElement)) return;
      if (!target.classList.contains('remove-btn')) return;

      var id = Number(target.getAttribute('data-id'));
      participants = participants.filter(function (participant) {
        return participant.id !== id;
      });

      renderParticipants();
    });
  }

  // carrega o VLibras como melhoria extra de acessibilidade.
  function initVlibras() {
    var accessContainer = createElement('div', {
      attrs: { vw: '', class: 'enabled' }
    });
    var accessButton = createElement('div', {
      attrs: { 'vw-access-button': '', class: 'active' }
    });
    var pluginWrapper = createElement('div', { attrs: { 'vw-plugin-wrapper': '' } });
    var topWrapper = createElement('div', { attrs: { class: 'vw-plugin-top-wrapper' } });

    pluginWrapper.appendChild(topWrapper);
    accessContainer.appendChild(accessButton);
    accessContainer.appendChild(pluginWrapper);
    document.body.appendChild(accessContainer);

    var script = createElement('script', {
      attrs: { src: 'https://vlibras.gov.br/app/vlibras-plugin.js' }
    });

    script.addEventListener('load', function () {
      if (window.VLibras && window.VLibras.Widget) {
        new window.VLibras.Widget('https://vlibras.gov.br/app');
      }
    });

    document.body.appendChild(script);
  }

  // início da aplicação
  document.addEventListener('DOMContentLoaded', function () {
    alert('Bem-vindo(a)! Faça o cadastro dos participantes do evento.');
    buildDynamicForm();
    renderParticipants();
    bindRemoveHandler();
    updateDateTime();
    initVlibras();
    setInterval(updateDateTime, 1000);
  });
})();
