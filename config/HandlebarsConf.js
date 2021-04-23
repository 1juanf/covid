exphbs.__switch_stack__ = [];

exphbs.registerHelper( "switch", function( value, options ) {
    exphbs.__switch_stack__.push({
        switch_match : false,
        switch_value : value
    });
    var html = options.fn( this );
    exphbs.__switch_stack__.pop();
    return html;
} );
exphbs.registerHelper( "case", function( value, options ) {
    var args = Array.from( arguments );
    var options = args.pop();
    var caseValues = args;
    var stack = exphbs.__switch_stack__[exphbs.__switch_stack__.length - 1];
    
    if ( stack.switch_match || caseValues.indexOf( stack.switch_value ) === -1 ) {
        return '';
    } else {
        stack.switch_match = true;
        return options.fn( this );
    }
} );
exphbs.registerHelper( "default", function( options ) {
    var stack = exphbs.__switch_stack__[exphbs.__switch_stack__.length - 1];
    if ( !stack.switch_match ) {
        return options.fn( this );
    }
} );