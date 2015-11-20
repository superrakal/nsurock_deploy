`import { test, moduleForComponent } from 'ember-qunit'`
`import hbs from 'htmlbars-inline-precompile'`

moduleForComponent 'profile-modal', 'Integration | Component | profile modal', {
  integration: true
}

test 'it renders', (assert) ->
  assert.expect 2

  # Set any properties with @set 'myProperty', 'value'
  # Handle any actions with @on 'myAction', (val) ->

  @render hbs """{{profile-modal}}"""

  assert.equal @$().text().trim(), ''

  # Template block usage:
  @render hbs """
    {{#profile-modal}}
      template block text
    {{/profile-modal}}
  """

  assert.equal @$().text().trim(), 'template block text'
