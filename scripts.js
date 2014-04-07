
// Case-insensitive contains()
$.expr[':'].Contains = function(a,i,m){
    return (a.textContent || a.innerText || '').toUpperCase().indexOf(m[3].toUpperCase())>=0;
};

function Filter(list) {
    this.el = list;

    // Filter input
    var form = $('<form>').attr({ 'action':'#' });
    var input = $('<input>').attr({ 'type':'text', 'placeholder':'Filter by keyword' });
    $(form).append(input).prependTo(this.el);

    // Filter function
    var self = this;
    $(input).change(function () {
        var filter = $(this).val();
        if(filter) {
            $(self.el).find('a:not(:Contains(' + filter + '))').parent().hide();
            $(self.el).find('a:Contains(' + filter + ')').parent().show();
        } else {
            $(self.el).find('li').show();
        }

        // Hide titles when group is empty
        $(self.el).find('ul').each(function () {
            if (!$(this).find('li:visible').length) {
                $(this).prev('h2').hide();
            } else {
                $(this).prev('h2').show();
            }
        });

        return false;
    })
    .keyup( function () { $(this).change(); });

    return this;
}

// Collapsible articles
$('article').each(function () {
    var that = $(this);
    var header = that.children('a');
    var body = that.children('.body');
    body.hide();
    header.click(function(argument) {
      body.toggle();
    });
});

var anchor = window.location.hash.substring(1);
if (anchor) $('article a#' + anchor).trigger('click');

// Expanding the article on link click and scrolling down to it
$('#sidebar a').each(function () {
    var that = $(this);
    var id = that.attr('href').substring(1);
    that.click(function (e) {
        var header = $('a#'+ id);
        if (!header.parent().hasClass('active')) header.trigger('click');
        $('html, body').animate({ scrollTop: header.offset().top }, 'fast');
    });

    // If we find a link in the body with similar anchor, add the same behavior
    $('.body a#'+ id).click(function (e) {
        $('#sidebar a#'+ id).trigger('click');
    });
});

// Hide all/Show all links
var show = $('<a class=\'control show\'>Toggle all</a>');
show.click(function () {
  $('#content article > .body').toggle();
});
$('#content').prepend(show);
// Making our navigation sticky
new Filter($('#sidebar > ul'));

////////////////////////////////////////