import { test, moduleForComponent } from 'ember-qunit';

moduleForComponent('smiles-component', 'Integration | Component | smiles component', {
  integration: true
});

test('it renders', function (assert) {
  assert.expect(2);
  this.render(hbs("{{smiles-component}}"));
  assert.equal(this.$().text().trim(), '');
  this.render(hbs("{{#smiles-component}}\n  template block text\n{{/smiles-component}}"));
  return assert.equal(this.$().text().trim(), 'template block text');
});