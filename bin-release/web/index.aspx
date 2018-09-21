         w�E        AutoEv     B����        ile="index.aspx.cs" Inherits="yl0414_index" %>
<!DOCTYPE HTML>
<html>

<head>
    <meta charset="utf-8">
    <title>Egret</title>
    <meta name="viewport" content="width=device-width,initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="full-screen" content="true" />
    <meta name="screen-orientation" content="portrait" />
    <meta name="x5-fullscreen" content="true" />
    <meta name="360-fullscreen" content="true" />
    <style>
        html, body {
            -ms-touch-action: none;
            background: #888888;
            padding: 0;
            border: 0;
            margin: 0;
            height: 100%;
        }
        @font-face{
            font-family: "BlueSkyStandardRegular";
            src: url("/resource/fonts/BlueSkyStandardRegular.ttf");
        }
    </style>
</head>
<div style="display:none;"><script src="https://s13.cnzz.com/z_stat.php?id=1274832603&web_id=1274832603"  language="JavaScript"></script></div>
<body>
    <div style="margin: auto;width: 100%;height: 100%;" class="egret-player" id="gameDiv
         data-entry-class="Main"
         data-orientation="auto"
         data-scale-mode="fixedHeight"
         data-frame-rate="60"
         data-content-width="750"
         data-content-height="1334"
         data-show-paint-rect="false"
         data-multi-fingered="2"
         data-show-fps="false" data-show-log="false"
         data-show-fps-style="x:0,y:0,size:12,textColor:0xffffff,bgAlpha:0.9">
    </div>
<script>
    var loadScript = function (list, callback) {
        var loaded = 0;
        var loadNext = function () {
            loadSingleScript(list[loaded], function () {
                loaded++;
                if (loaded >= list.length) {
                    callback();
                }
                else {
                    loadNext();
                }
            })
        };
        loadNext();
    };

    var loadSingleScript = function (src, callback) {
        var s = document.createElement('script');
        s.async = false;
        s.src = src;
        s.addEventListener('load', function () {
            s.parentNode.removeChild(s);
            s.removeEventListener('load', arguments.callee, false);
            callback();
        }, false);
        document.body.appendChild(s);
    };

   var xhr = new XMLHttpRequest();
    document.fonts.ready.then(success, fail);
    function success() {
        xhr.open('GET', './manifest.json?v=' + Math.random(), true);
        xhr.addEventListener("load", function () {
            var manifest = JSON.parse(xhr.response);
            var list = manifest.initial.concat(manifest.game);
            loadScript(list, function () {
                /**
                 * {
                 * "renderMode":, //Engine rendering mode, "canvas" or "webgl"
                 * "audioType": 0 //Use the audio type, 0: default, 2: web audio, 3: audio
                 * "antialias": //Whether the anti-aliasing is enabled in WebGL mode, true: on, false: off, defaults to false
                 * "calculateCanvasScaleFactor": //a function return canvas scale factor
                 * }
                 **/
                egret.runEgret({
                    renderMode: "webgl", audioType: 0, calculateCanvasScaleFactor: function (context) {
                        var backingStore = context.backingStorePixelRatio ||
                            context.webkitBackingStorePixelRatio ||
                            context.mozBackingStorePixelRatio ||
                            context.msBackingStorePixelRatio ||
                            context.oBackingStorePixelRatio ||
                            context.backingStorePixelRatio || 1;
                        return (window.devicePixelRatio || 1) / backingStore;
                    }
                });
            });
        });
        xhr.send(null);
    }
    function fail() {
    }
</script>
</body>

</html>
<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
    <script>
        wx.config({
            debug: false,
            appId: '<% =appId%>',
            timestamp: '<% =timestamps%>',
            nonceStr: '<% =nonce%>',
            signature: '<% =signatures%>',
            jsApiList: [
				'checkJsApi',
				'onMenuShareTimeline',
				'onMenuShareAppMessage',
			]
        });

        wx.ready(function () {
            wx.checkJsApi({
                jsApiList: [
					'onMenuShareTimeline',
                    'onMenuShareAppMessage',
				]
            });

            wx.onMenuShareTimeline({
                title: window['title'],
                link: '<% =url%>',
                imgUrl: '<% =WeChatImg%>',
                trigger: function (res) {

                },
                success: function (res) {


                },
                cancel: function (res) {


                },
                fail: function (res) {
                    // alert('wx.onMenuShareTimeline:fail: ' + JSON.stringify(res));
                }
            });
            wx.onMenuShareAppMessage({
                title:window['title'],
                desc: '<% =desc%>', // 分享描述
                link: '<% =url%>',
                imgUrl: '<% =WeChatImg%>',
                type: '', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: function () {

                },
                cancel: function () {


                }
            });
        });
        wx.error(function (res) {

        });

	</script>