jQuery ->
  $("a[rel~=popover], .has-popover").popover()
  $("a[rel~=tooltip], .has-tooltip").tooltip()

$(document).on 'click', '.title h2', ->
  el = $(this).attr('href')
  $('body').animate { scrollTop: $(el).offset().top }, 250

$(document).ready ->
  $('html').niceScroll()