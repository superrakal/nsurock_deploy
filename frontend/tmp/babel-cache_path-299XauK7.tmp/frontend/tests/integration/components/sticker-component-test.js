import { test, moduleForComponent } from 'ember-qunit';

moduleForComponent('sticker-component', 'Integration | Component | sticker component', {
  integration: true
});

test('it renders', function (assert) {
  assert.expect(2);
  this.render(hbs("{{sticker-component}}"));
  assert.equal(this.$().text().trim(), '');
  this.render(hbs("{{#sticker-component}}\n  template block text\n{{/sticker-component}}"));
  return assert.equal(this.$().text().trim(), 'template block text');
});