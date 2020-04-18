/**
 * spa.js
 * Root namespace module
 */

// 设置JSLint开关
// 告诉JSLint，spa和$是全局变量
 /* jslint          browser: true,  continue: true,
    devel: true,    indent: 2,      maxerr: 50,
    newcap: true,   nomen: true,    plusplus: true,
    regexp: true,   sloppy: true,   vars: false,
    white: true
 */
 /* global $, spa */

// 使用模块模式来创建"spa"名字空间
var spa = (function () {
        'use strict';
        var initModule = function ($container) {
                $container.html(
                    '<h1 style="display: inline-block; margin: 25px;">'
                        + 'hello world!'
                        + '</h1>'
                );
            };

        return { initModule: initModule };
    }());