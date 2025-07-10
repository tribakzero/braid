Handlebars.registerHelper("naturalNumber", (value, options) => parseInt(value) + 1);
Handlebars.registerHelper("dietsList", (value) => value.length ? `(${value.join(', ')})` : null)

let schema;

const main = async ()  => {
  schema = await fetch('./eatsy/schema.json').then(response => response.json());
  data = await fetch('./eatsy/data.json').then(response => response.json());

  const options = {
    theme: "bootstrap5",
    iconlib: "fontawesome5",
    disable_edit_json: true,
    disable_properties: true
  };

  var editor = new JSONEditor(document.getElementById('editor'),{
    ...options,
    schema,
    startval: data
  });

  document.getElementById('submit').addEventListener('click', async () => {
    const result = await renderEatsy(editor.getValue());
    navigator.clipboard.writeText(result);
  });


}

main();


const renderEatsy = async (source) =>
  fetch('./eatsy/template.hbs', {
    headers: new Headers({'content-type': 'text/x-handelbars-template'}),
  })
    .then((response) => response.text())
    .then((template) => {
      const render = Handlebars.compile(template);
      const result = render(source);

      return result;
    });
