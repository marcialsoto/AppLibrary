const $ = require('jquery')

const jQuery = require("jquery");
window.jQuery = require('jquery')
window.Popper = require('popper.js')
require('bootstrap')

/* const Chart = require('chart.js'); */
/* const Chartkick = require('chartkick'); */
let Swiper = require('swiper');

//require('select2');
import select2 from 'select2';

select2($);

//import "select2/dist/js/select2";

let toastr = require("toastr");

let SimpleBar = require('simplebar');

const flatpickr = require("flatpickr");

const bootbox = require("bootbox");

import "inputmask/dist/inputmask/jquery.inputmask";

const inputmask = require('inputmask');

import { library, dom, config } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';


library.add(fas, far, fab);
config.searchPseudoElements = true;
dom.watch();

const JSZip = require('jszip');
window.JSZip = JSZip;

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

require( 'datatables.net-bs4' )( window, $ );
require( 'datatables.net-buttons-bs4' )( window, $ );
require( 'datatables.net-buttons/js/buttons.colVis.js' )( window, $ );
require( 'datatables.net-buttons/js/buttons.flash.js' )( window, $ );
require( 'datatables.net-buttons/js/buttons.html5.js' )( window, $ );
require( 'datatables.net-buttons/js/buttons.print.js' )( window, $ );
require( 'datatables.net-responsive-bs4' )( window, $ );  

$(function() {
    $('[data-toggle="popover"]').popover();
    $('[data-toggle="tooltip"]').tooltip();

    //console.log(select2);
    //$('.js-example-basic-multiple').select2();

    // media query event handler
    if (matchMedia) {
        const mq = window.matchMedia("(min-width: 768px)");
        mq.addListener(WidthChange);
        WidthChange(mq);
    }

    // media query change
    function WidthChange(mq) {
        if (mq.matches) {
            $('body').addClass('sidebar-expand');
            $('body').removeClass('sidebar-collapse');
            //console.log("window width is at least 768px");
        } else {
            $('body').removeClass('sidebar-expand');
            $('body').addClass('sidebar-collapse');
            //console.log("window width is less than 768px");
        }
    }

    $('.sidebartoggler').click(function() {
        $('body').toggleClass('sidebar-expand sidebar-collapse');
        $('.sidebartoggler').toggleClass('is-active');
    });

    $('.sidebarSecondarytoggler').click(function() {
        $('body').toggleClass('sidebar-secondary-expand sidebar-secondary-collapse');
        $('.sidebarSecondarytoggler').toggleClass('is-active');
    });

    $('input.form-control').focus(function() {
        $(this).parents('.form-group').addClass('in-focus');
    }).blur(function(){
        let tmpval = $(this).val();
        $(this).parents('.form-group').removeClass('in-focus');
        if (tmpval == '') {
            $(this).parents('.form-group').addClass('empty');
            $(this).parents('.form-group').removeClass('active');
            //console.log(tmpval);
           
        } else {
            $(this).parents('.form-group').addClass('active');
            $(this).parents('.form-group').removeClass('empty');
            //console.log(tmpval);
        }
    });

    $('input:required').blur(function() {
        let tmpval = $(this).val();
        if (tmpval == '') {
            $(this).parents('.form-group').addClass('is-invalid');
            $(this).parents('.form-group').removeClass('is-valid');
            //console.log(tmpval);
        }else{
            $(this).parents('.form-group').addClass('is-valid');
            $(this).parents('.form-group').removeClass('is-invalid');
            //console.log(tmpval);
        }
    });

    $(".custom-select:required").change(function(){
        let value = $(this).val();
        if(value == "0" || value == "")
         {
            $(this).addClass('is-invalid');
            $(this).removeClass('is-valid');
            //console.log(value);
         }
         else
         {
            $(this).addClass('is-valid');
            $(this).removeClass('is-invalid');
            //console.log(value);
         }
       });

    $('table.datagrid').DataTable({
        language: {
            "sProcessing": "Procesando...",
            "sLengthMenu": "Mostrar _MENU_ registros",
            "sZeroRecords": "No se encontraron resultados",
            "sEmptyTable": "Ningún dato disponible en esta tabla",
            "sInfo": "Mostrando del _START_ al _END_ de _TOTAL_ registros",
            "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
            "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
            "sInfoPostFix": "",
            "sSearch": "Buscar:",
            "sUrl": "",
            "sInfoThousands": ",",
            "sLoadingRecords": "Cargando...",
            "oPaginate": {
                "sFirst": "Primero",
                "sLast": "Último",
                "sNext": "Siguiente",
                "sPrevious": "Anterior"
            },
            "oAria": {
                "sSortAscending": ": Actilet para ordenar la columna de manera ascendente",
                "sSortDescending": ": Actilet para ordenar la columna de manera descendente"
            }
        },
        responsive: true
    });

    $(".flatpickr").flatpickr();
});

$(document).keyup(function(e) {
    if (e.keyCode == 27) {
        if($('.sidebartoggler').hasClass('is-active')){
            $('body').removeClass('sidebar-expand');
            $('body').addClass('sidebar-collapse');
            $('.sidebartoggler').removeClass('is-active');
        }
   }
});

$('a[data-toggle="collapse"]').on('click', function () {
  $(this)
      .find('[data-fa-i2svg]')
      .toggleClass('fa-angle-up')
      .toggleClass('fa-angle-down');
  });