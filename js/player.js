jwplayer['key'] = 'r/viHfrthMvlepAj1LfUPgiRYNSo17HhByHoAIZ4D0s=';
var loc = window['location'];
var temp = loc['pathname']['split']('/');
tmp = temp[3]['split']('-');
var eid = tmp[0];
var sv = tmp[1];
tmp2 = temp[2]['split']('-');
var mid = tmp2[tmp2['length'] - 1];
var first_load = true,
    player_ready = false,
    load_backup = false,
    playlist, player = jwplayer('media-player'),
    sv_error = [],
    sv_default = 5,
    eb_default = 14,
    auto_next = true,
    player_settings = {},
    ad_is_shown = false,
    rlcnt = 0;

function get_episodes() {
    $['ajax']({
        url: '/ajax/v4_movie_episodes/' + mid,
        method: 'GET',
        dataType: 'json',
        async: false,
        success: function(_0x8583x13) {
            $('.pa-server')['html'](_0x8583x13['html'])
        }
    })
}

function setup_player() {
    player_ready = true;
    var _0x8583x15 = {
        playlist: playlist,
        allowfullscreen: true,
        width: '100%',
        height: '500px',
        autostart: true,
        cast: {},
        captions: {
            color: '#f3f378',
            fontSize: 16,
            backgroundOpacity: 0,
            fontfamily: 'Helvetica',
            edgeStyle: 'raised'
        },
        skin: {
            active: '#E75A3A',
            inactive: 'white',
            background: 'black'
        }
    };
    player['setup'](_0x8583x15);
    player['on']('setupError', function(_0x8583x16) {
        player_error()
    });
    player['on']('ready', function() {
        var _0x8583x17 = custombanner['mobileChecker']();
        if (!_0x8583x17) {
            $('#media-player')['prepend']('<div id="overlay-solarplugin-main" style="position: absolute; left: 0px; top: 0px; width: 100%; height: 100%;"></div>')
        }
    });
    player['on']('complete', function() {
        if (auto_next && $('#episodes-sv-' + sv + ' .ep-item')['length'] > 1) {
            var _0x8583x18 = get_ep_index();
            if (_0x8583x18 > 0) {
                _0x8583x18 -= 1;
                $('#episodes-sv-' + sv + ' .ep-item[data-index=' + _0x8583x18 + ']')['click']()
            }
        }
    });
    player['on']('play', function() {
        sv_error = []
    });
    player['on']('firstFrame', function() {
        if (first_load && localStorage['getItem'](eid) && localStorage['getItem'](eid) > 30) {
            first_load = false;
            player['pause']();
            $('#time-resume')['text'](convert_time(localStorage['getItem'](eid)));
            $('#pop-resume')['modal']('show')
        }
    });
    player['on']('time', function() {
        if (!load_backup) {
            localStorage['setItem'](eid, player['getPosition']())
        };
        var _0x8583x17 = custombanner['mobileChecker']();
        if (!_0x8583x17) {
            var _0x8583x19 = custombanner['adTime']();
            if (parseInt(player['getPosition']()) === _0x8583x19['start'] && !ad_is_shown) {
                custombanner['addTag']();
                ad_is_shown = true
            };
            if (parseInt(player['getPosition']()) === _0x8583x19['end'] && ad_is_shown) {
                custombanner['removeTag']()
            }
        }
    });
    player['on']('error', function(_0x8583x16) {
        if (parseInt(sv) === 5 && rlcnt < 3) {
            player['load'](playlist);
            rlcnt += 1
        } else {
            player_error()
        }
    })
}

function player_error() {
    if (sv_error['indexOf'](sv) < 0) {
        sv_error['push'](sv)
    };
    var _0x8583x1b = false;
    $('.server-item.vip')['each'](function(_0x8583x1c) {
        if (sv_error['indexOf']($(this)['attr']('data-id')) < 0) {
            sv = $(this)['attr']('data-id');
            _0x8583x1b = true;
            $(this)['click']();
            $('#episodes-sv-' + sv + ' .ep-item[data-index=' + get_ep_index() + ']')['click']();
            return false
        }
    });
    if (!_0x8583x1b && !load_backup) {
        if ($('.server-item.backup')['length'] > 0) {
            _0x8583x1b = true;
            load_backup = true;
            eid = $('#episodes-sv-69 .ep-item[data-index=' + get_ep_index() + ']')['attr']('data-id');
            get_sources()
        }
    };
    if (!_0x8583x1b) {
        load_embed()
    }
}

function load_server() {
    if ($('#sv-' + sv_default)['length'] > 0) {
        sv = sv_default;
        $('#sv-' + sv_default)['click']()
    } else {
        $('.server-item')['each'](function(_0x8583x1c) {
            if (_0x8583x1c == 0) {
                sv = $(this)['attr']('data-id');
                $(this)['click']()
            }
        })
    };
    var _0x8583x1e = $('#episodes-sv-' + sv + ' .ep-item')['length'] - 1;
    $('#episodes-sv-' + sv + ' .ep-item[data-index=' + _0x8583x1e + ']')['click']();
    $('.server-item')['addClass']('sv-loaded')
}

function load_embed() {
    if ($('#sv-' + eb_default)['length'] > 0) {
        sv = eb_default;
        $('#sv-' + eb_default)['click']()
    } else {
        $('.server-item.embed')['each'](function(_0x8583x1c) {
            if (_0x8583x1c == 0) {
                sv = $(this)['attr']('data-id');
                $(this)['click']()
            }
        })
    };
    $('#episodes-sv-' + sv + ' .ep-item[data-index=' + get_ep_index() + ']')['click']()
}

function get_ep_index() {
    return parseInt($('#ep-' + eid)['attr']('data-index'))
}

function convert_time(_0x8583x22) {
    var _0x8583x23 = new Date(0, 0, 0);
    _0x8583x23['setSeconds'](+_0x8583x22);
    var _0x8583x24 = _0x8583x23['getHours']();
    var _0x8583x25 = _0x8583x23['getMinutes']();
    var _0x8583x26 = _0x8583x23['getSeconds']();
    return (_0x8583x24 < 10 ? ('0' + _0x8583x24) : _0x8583x24) + ':' + (_0x8583x25 < 10 ? ('0' + _0x8583x25) : _0x8583x25) + ':' + (_0x8583x26 < 10 ? ('0' + _0x8583x26) : _0x8583x26)
}
$('#yes-resume')['click'](function() {
    $('#pop-resume')['modal']('hide');
    player['seek'](localStorage['getItem'](eid))
});
$('#no-resume')['click'](function() {
    $('#pop-resume')['modal']('hide');
    player['play']()
});

function get_sources() {
    if (player_ready) {
        player['stop']()
    };
    first_load = true;
    $['getScript']('https://solarmoviez.to/ajax/movie_token?eid=' + eid + '&mid=' + mid, function() {
        $['ajax']({
            url: 'https://solarmoviez.to/ajax/movie_sources/' + eid + '?x=' + _x + '&y=' + _y,
            method: 'GET',
            dataType: 'json',
            success: function(_0x8583x13) {
                if (_0x8583x13['embed']) {
                    if (WebTorrent['WEBRTC_SUPPORT']) {
                        $('#content-embed')['show']();
                        $('#media-player')['hide']();
                        player['stop']();
                        $('#embed-loading')['hide']();
                        $('#iframe-embed')['attr']('src', _0x8583x13['src'])
                    } else {
                        player_error()
                    }
                } else {
                    $('#iframe-embed')['attr']('src', '');
                    playlist = _0x8583x13['playlist'];
                    if (player_ready) {
                        player['load'](playlist)
                    } else {
                        setup_player()
                    }
                }
            },
            error: function() {}
        })
    })
}

function get_embed() {
    $['ajax']({
        url: 'https://solarmoviez.to/ajax/movie_embed/' + eid,
        method: 'GET',
        dataType: 'json',
        success: function(_0x8583x13) {
            $('#embed-loading')['hide']();
            $('#iframe-embed')['attr']('src', _0x8583x13['src'])
        }
    })
}
$(document)['on']('click', '.server-item', function() {
    var _0x8583x29 = $(this)['attr']('data-id');
    $('.server-item')['removeClass']('active');
    $(this)['addClass']('active');
    $('.server-list-item')['hide']();
    $('#episodes-sv-' + _0x8583x29)['show']();
    $('.playing-on')['text']($(this)['text']()['trim']())
});
$(document)['on']('click', '.sv-loaded', function() {
    sv = $(this)['attr']('data-id');
    if ($('#episodes-sv-' + sv + ' .ep-item')['length'] == 1) {
        $('#episodes-sv-' + sv + ' .ep-item')['click']()
    }
});

function change_url() {
    var _0x8583x2b = loc['protocol'] + '//' + loc['hostname'] + '/movie/' + temp[2] + '/' + eid + '-' + sv + '/watching.html';
    history['pushState']({}, '', _0x8583x2b)
}
$('.bp-btn-auto')['click'](function() {
    if (auto_next) {
        auto_next = false;
        $(this)['removeClass']('active')
    } else {
        auto_next = true;
        $(this)['addClass']('active')
    };
    player_settings['auto_next'] = auto_next;
    $['cookie']('player_settings', JSON['stringify'](player_settings), {
        expires: 365
    })
});
$(document)['on']('click', '.ep-item', function() {
    eid = $(this)['attr']('data-id');
    sv = $(this)['attr']('data-server');
    $('.ep-item')['removeClass']('active');
    $('#ep-' + eid)['addClass']('active');
    if ($('#sv-' + sv)['hasClass']('embed')) {
        $('#media-player')['hide']();
        $('#content-embed')['show']();
        player['stop']();
        get_embed()
    } else {
        $('#media-player')['show']();
        $('#content-embed')['hide']();
        get_sources()
    };
    change_url()
});
$(document)['ready'](function() {
    get_episodes();
    if ($['cookie']('player_settings')) {
        player_settings = JSON['parse']($['cookie']('player_settings'));
        auto_next = player_settings['auto_next']
    };
    if (!auto_next) {
        $('.bp-btn-auto')['removeClass']('active')
    };
    if (temp['length'] < 5) {
        load_server()
    } else {
        if ($('#ep-' + eid)['length'] > 0 && $('#sv-' + sv)['length'] > 0) {
            $('#sv-' + sv)['click']();
            $('#ep-' + eid)['click']()
        } else {
            window['location']['href'] = loc['protocol'] + '//' + loc['hostname'] + '/movie/' + temp[2] + '.html'
        };
        $('.server-item')['addClass']('sv-loaded')
    }
})