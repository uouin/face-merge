/**
 * Created by yitala on 2018/3/6.
 */

import '../assets/css/app.css';
import '../../node_modules/swiper/dist/css/swiper.min.css';
import Swiper from 'swiper';
import $ from 'jquery';
var { faceMerge } = require('qq-ai-sdk');

var selectModel = 1;

$(document).ready(function () {
    var mySwiper = new Swiper ('.swiper-container', {
        // Optional parameters
        direction: 'horizontal',
        loop: true,

        // If we need pagination
        pagination: {
            el: '.swiper-pagination',
        },

        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        // And if we need scrollbar
        scrollbar: {
            el: '.swiper-scrollbar',
        },
    })

    $("#ensure").click(function(){
        selectModel = mySwiper.realIndex;
        $("#page1").hide();
        $("#page2").show();
    })

    $('input[type=file]').change(function () {
        var file = document.querySelector('#img').files[0];
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            console.log(reader.result);
            var base64ImageContent = reader.result.replace(/^data:image\/(png|jpg|jpeg);base64,/, "");
            var blob = base64ToBlob(base64ImageContent, 'image/jpg');
            var formData = new FormData();
            formData.append('picture', blob);
            let url = "http://localhost:4000/upload";
            $.ajax({
                url: url,
                type: "POST",
                cache: false,
                contentType: false,
                processData: false,
                data: formData})
                .done(function(e){
                    console.log('done');
                });

            // faceMerge(1106759498,'W7MysZoIXLNw4hpd',reader.result,getModel(selectModel))
            //     .then((res)=>{
            //         let data = `data:image/jpeg;base64,${res.data.image}`;
            //         $("#merge-content").append(`<img src="${data}">`);
            //     })
            //     .catch(err=>{
            //         console.log('出错了'+err);
            //     })
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    });
});

function getModel(index){
    switch (index){
        case 0:return 1;
        case 1:return 27;
        case 2:return 25;
        default:return 1;
    }
}

function base64ToBlob(base64, mime)
{
    mime = mime || '';
    var sliceSize = 1024;
    var byteChars = window.atob(base64);
    var byteArrays = [];

    for (var offset = 0, len = byteChars.length; offset < len; offset += sliceSize) {
        var slice = byteChars.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, {type: mime});
}
