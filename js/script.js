$(function() {
    var battles = [];

    var baseUrl = 'http://apitest.liquidfeedback.org:25520/';
    var apiKey = '';

    var startTime = '';
    var endTime = '';

    var limit = 1000;

    $('input#submit').click(function(event) {
        reset();
        init();
    });

    init();

    function reset() {
        var battles = [];

        baseUrl = $('input#baseUrl').val();
        apiKey = $('input#apiKey').val();

        startTime = parseInt($('input#startTime').val());
        endTime = parseInt($('input#endTime').val());

        limit = parseInt($('input#limit').val());
    }

    function init() {

        //todo: loading

        var session_key = '';
        $.post(baseUrl + 'session', { key: apiKey }, function(data, msg) {
            if (msg == 'ok') {
                session_key = data.session_key;
            }

            // prepare url
            /*var url = baseUrl + 'battle?limit=' + limit;
             if (session_key != '') {
                 url += '&session_key=' + session_key;
             }
             $.getJSON(url, function(data) {
                 var currentIssueId = -9999;
                 var issue = {};
                 $.each(data.result, function(key, val) {
                     if (currentIssueId != val.issue_id && currentIssueId != -9999) {
                         battles[currentIssueId] = issue;
                         issue = {};
                     }
                     issue[key] = val;
                 });
                 battles[currentIssueId] = issue;

                 var result = '';
                 $.each(battles, function(issueKey, issueVal) {
                     var winnignInitaitve;
                     $.each(issueVal, function(key, val) {
                         winnignInitaitve = val.winning_initiative;
                     });
                     //result += '<li>issueId: ' + issueKey + ', winnignInitaitve: ' + winnignInitaitve + '</li>';
                     result += 'test';
                 });
                 result += 'test';
                 $('#results ul').html(result);

             });*/


            // prepare url
            /*var url = baseUrl + 'issue?limit=' + limit;
             if (session_key != '') {
                 url += '&session_key=' + session_key;
             }
             $.getJSON(url, function(data) {
                 var result = '';
                 $.each(data.result, function(key, val) {
                     result += '<li>id: ' + val.id + '</li>';
                 });
                 $('#results ul').html(result);
             });*/


            // prepare url
            var url = baseUrl + 'initiative?limit=' + limit;
            if (session_key != '') {
                url += '&session_key=' + session_key;
            }
            $.getJSON(url, function(data) {
                var result = '';
                $.each(data.result, function(key, val) {
                    if (val.winner != true) {
                        return;
                    }

                    result += '<li>';
                    result += '<dl class="issue">';

                    result += '<dt>issue_id</dt><dd>' + val.issue_id + '</dd>';
                    result += '<dt>id</dt><dd>' + val.id + '</dd>';
                    result += '<dt>name</dt><dd>' + val.name + '</dd>';

                    result += '</dl>';
                    result += '</li>';
                });
                $('#results ul').html(result);
            });

        }, "json");
    }

});
