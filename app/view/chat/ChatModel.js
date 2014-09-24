/**
 * This is the View Model associated to the login view.
 */
Ext.define('OP.view.chat.ChatModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.chat',

    stores: {
        messages: {
            model: 'Message',
            data : [
                {displayName: 'Ed',    id: 'Spencer', timestamp:'"2012-01-03 5:43:21 PM"', message: 'Opera dsafds fsdfsafsadfsadfsdf'},
                {displayName: 'Tommy', id: 'Maintz', timestamp:'"2012-01-03 5:43:21 PM"', message: 'Mozila sfsadfsafd safdsadf sadfsa fdsad fsa dfsa df safsa f'},
                {displayName: 'Aaron', id: 'Conran', timestamp:'"2014-09-17 00:05:21 AM"', message: 'Android fdasfsadfrrdaewsdf safafsedfascd dsafd dsaf ewa fsadfs dsaf '},
                {displayName: 'Jamie', id: 'Avins', timestamp:'"2012-01-03 5:43:21 AM"', message: 'IE dsafsdf saf sdf fretyt yjuy ujjmnbn bnvc fds vcfdsvcfds gtrjh m hfn'}
            ]
        }
    }
});
