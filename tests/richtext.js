var fs = require('fs');
var PImage = require('../src/pureimage');
var comp = require('../../../richtext/rt2/component');
var Document = require('../../../richtext/rt2/document').Document;

function makeStyledJSDoc() {
    var frame = Document.makeFrame();
    frame.styles = {
        'bold': {
            'font-style':'normal',
            'font-family':"'Source Serif Pro'",
            'font-weight':'700',
        },
        'italic': {
            'font-style':'italic',
            'font-family':"'Source Serif Pro'",
        },
        'code': {
            'color':'#000000',
            'font-family':"'Source Code Pro'",
            'background-color':'#ccffee',
        },
        'plain': {
            'font-size':20,
            'color':'#000000',
            'font-style':'normal',
            'font-weight':'400',
        },

        'paragraph': {
            'color':'#000000',
            'font-size':15,
            'font-family':"'Source Serif Pro'",
            'font-style':'normal',
            'background-color':'#ffffff',
            'font-weight':'400',
            'block-padding':15,
            'border-color':'#000000',
        },
        'header': {
            'font-size':30,
            'font-family':"'Source Sans Pro'",
            'block-padding':10,
        },
        'subheader': {
            'font-size':20,
            'font-family':"'Source Sans Pro'",
            'block-padding':10,
        },
        'left': {
            'font-size':25,
            'font-family':"'Source Sans Pro'",
            'block-padding':10,
            'text-align':'left',
        },
        'center': {
            'font-size':25,
            'font-family':"'Source Sans Pro'",
            'block-padding':10,
            'text-align':'center',
        },
        'right': {
            'font-size':25,
            'font-family':"'Source Sans Pro'",
            'block-padding':10,
            'text-align':'right',
        },
    }

    var blk = frame.insertBlock();
    blk.stylename = 'paragraph';
    blk.insertSpan("This is some plain text");
    blk.insertSpan(" italic,").stylename = 'italic';
    blk.insertSpan(" bold,").stylename = 'bold';
    blk.insertSpan(" and code,").stylename = 'code';
    blk.insertSpan(" yet again.");
    blk.insertSpan(" And now for a really long span that will have to be wrapped."
    +" It really is pretty long, don't you think?");
    var blk = frame.insertBlock();
    blk.stylename = 'header';
    blk.insertSpan("This is a header");
    var blk = frame.insertBlock();
    blk.stylename = 'subheader';
    blk.insertSpan("This is a sub header");

    var blk = frame.insertBlock();
    blk.stylename = 'paragraph';
    blk.insertSpan("Another paragraph of text is here. I think this is pretty cool. Don't you think so? Let's type some more so that the text will wrap.");
    var blk = frame.insertBlock();
    blk.stylename = 'paragraph';
    blk.insertSpan("Another paragraph of text is here. I think this is pretty cool. Don't you think so? Let's type some more so that the text will wrap.");
    return frame;
}


var fnt = PImage.registerFont('tests/fonts/SourceSansPro-Regular.ttf','Source Sans Pro');
fnt.load(function() {

    var img = PImage.make(800,400);
    var ctx = img.getContext('2d');
    ctx.setFillStyleRGBA(0,255,255, 1);
    ctx.setFont('Source Sans Pro',20);
    ctx.fillText("Greetings",50,150);
    ctx.fillText("Earthling",50,360);

    var config = {
        context:ctx,
        frame:makeStyledJSDoc(),
        width:  600,
        height: 400,
        charWidth : function(ch,
                font_size,
                font_family,
                font_weight,
                font_style
            ) {
            ctx.setFont(font_family,font_size);
            return ctx.measureText(ch).width;
        },

    }

    var rte = comp.makeRichTextView(config);
    rte.relayout();
    rte.redraw();

    PImage.encodePNG(img, fs.createWriteStream("richtext.png"), function(){
        console.log("rendered richtext.png");
    });

});
