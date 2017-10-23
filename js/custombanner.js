var countDownInterval;

custombanner = {},
    custombanner.adStatus = function () {
        return true;
    },
    custombanner.adType = function () {
        return 2;
    },
    custombanner.getRandom = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    },
    custombanner.addTag = function () {
        switch (custombanner.adType()) {
            case 1:
                var banners = custombanner.getDataBanners();
                var ad_html = '<div id="overlay-solarplugin" style="position: absolute; bottom: 50%; left: 50%; margin-left: -150px; margin-bottom: -125px;"><a onclick="custombanner.removeTag()" style="position: absolute; top: 10px; right: 10px; z-index: 997;"><img src="https://img.gocdn.online/2016/08/07/poster/close-ads.png" title="close ads" alt="close ads"></a><a href="' + banners.link + '" target="_blank" rel="nofollow" style="z-index: 996; position: relative;"><div id="timer-close" style="position: absolute; top: 10px; right: 10px; z-index: 997;"><span id="timer-text" style="color: #fff; font-size: 13px; text-shadow: 0 0 4px #000;font-weight: bold;">This will be closed after 10 seconds</span></div><img src="' + banners.image + '" width="300" height="250"></a></div>';
                break;
            case 2:
                var frames = custombanner.getDataIframe();
                var ad_html = '<div id="overlay-solarplugin" style="position: absolute; bottom: 45px; left: 50%; margin-left: -364px; width:728px;height:90px; z-index: 996"><div id="remove-tag" style="position: absolute; top: 10px; right: 10px; z-index: 997; display: none;"><a onclick="custombanner.removeTag()"><img src="https://img.gocdn.online/2016/08/07/poster/close-ads.png" title="close ads" alt="close ads"></a></div><div id="timer-close" style="position: absolute; top: 10px; right: 10px; z-index: 997;"><span id="timer-text" style="color: #fff; font-size: 13px; text-shadow: 0 0 4px #000;font-weight: bold;">This will be closed after 10 seconds</span></div><iframe src="https://creative.wwwpromoter.com/37169?d=728x90" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" height="90" width="728" style="width: 100%; height: 100%; border: 0px; margin: 0px; padding: 0px;"></iframe></div>';
                break;
            default:
                break;
        }
        $("#overlay-solarplugin-main").prepend(ad_html);
        clearInterval(countDownInterval);
        custombanner.countDown(15, document.querySelector('#timer-text'));
    },
    custombanner.getDataBanners = function () {

        var banners_1 = {
            images: ["https://img.gocdn.online/banner/4F6a0kb.png"],
            links: ["https://vela.to/coupon"]
        };
        var random_1 = custombanner.getRandom(0, 0);
        return {image: banners_1.images[random_1], link: banners_1.links[random_1]};

    },
    custombanner.getDataIframe = function () {
        var frames = [
            // base_url + 'assets/invideo.html',
            'https://creative.wwwpromoter.com/19997?d=728x90'
        ];
        var random = custombanner.getRandom(0, frames.length - 1);
        return frames[random];
    },
    custombanner.removeTag = function () {
        $("#overlay-solarplugin").remove();
    },
    custombanner.adTime = function () {
        return {start: 5, end: 28};
    },
    custombanner.mobileChecker = function () {
        return true;
        if (!jQuery.browser.mobile) {
            // if ($.cookie("user_geo_2") == 1) {
                return false;
            // }
        }
        return true;
    },
    custombanner.countDown = function (duration, display) {
        var timer = duration, minutes, seconds;
        countDownInterval = setInterval(function () {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            display.textContent = 'This will be closed after ' + seconds + ' seconds';

            if (--timer < 0) {
                custombanner.btnCloseShow();
            }
        }, 1000);
    },
    custombanner.btnCloseShow = function () {
        $("#remove-tag").show();
        $("#timer-close").hide();
    };
