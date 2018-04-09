window.jQuery = require('jquery')
window.Popper = require('popper.js')
require('bootstrap')

const Chart = require('chart.js');
const Chartkick = require('chartkick');
let Swiper = require('swiper');

let Bloodhound = require("typeahead.js-browserify").Bloodhound
let engine = new Bloodhound({
    local: ['dog', 'pig', 'moose'],
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    datumTokenizer: Bloodhound.tokenizers.whitespace
});

let jQuery = require("jquery");

import fontawesome from '@fortawesome/fontawesome'

import brands from '@fortawesome/fontawesome-free-brands'
import solid from '@fortawesome/fontawesome-free-solid'
import regular from '@fortawesome/fontawesome-free-regular'

fontawesome.library.add(brands, solid, regular)


let typeahead = require("typeahead.js-browserify");
typeahead.loadjQueryPlugin();

Chartkick.options = {
    colors: ['#7daf28', '#f5d269', '#8c6437', '#b48caf', '#3ccdcd']
}

const dt = require('datatables.net-responsive-bs4')();

jQuery(function() {
    jQuery('[data-toggle="popover"]').popover();
    jQuery('[data-toggle="tooltip"]').tooltip();

    // media query event handler
    if (matchMedia) {
        const mq = window.matchMedia("(min-width: 768px)");
        mq.addListener(WidthChange);
        WidthChange(mq);
    }

    // media query change
    function WidthChange(mq) {
        if (mq.matches) {
            jQuery('body').addClass('sidebar-expand');
            jQuery('body').removeClass('sidebar-collapse');
            console.log("window width is at least 768px");
        } else {
            jQuery('body').removeClass('sidebar-expand');
            jQuery('body').addClass('sidebar-collapse');
            console.log("window width is less than 768px");
        }
    }

    jQuery('.sidebartoggler').click(function() {
        jQuery('body').toggleClass('sidebar-expand sidebar-collapse');
        jQuery('.sidebartoggler').toggleClass('is-active');
    });

    jQuery('input.form-control').focus(function() {
        jQuery(this).parents('.form-group').addClass('in-focus');
    }).blur(function(){
        let tmpval = jQuery(this).val();
        jQuery(this).parents('.form-group').removeClass('in-focus');
        if (tmpval == '') {
            jQuery(this).parents('.form-group').addClass('empty');
            jQuery(this).parents('.form-group').removeClass('not-empty');
            console.log(tmpval);
           
        } else {
            jQuery(this).parents('.form-group').addClass('not-empty');
            jQuery(this).parents('.form-group').removeClass('empty');
            console.log(tmpval);
        }
    });

    jQuery('input:required').blur(function() {
        let tmpval = jQuery(this).val();
        if (tmpval == '') {
            jQuery(this).addClass('is-invalid');
            jQuery(this).removeClass('is-valid');
            console.log(tmpval);
        }else{
            jQuery(this).addClass('is-valid');
            jQuery(this).removeClass('is-invalid');
            console.log(tmpval);
        }
    });

    jQuery(".custom-select:required").change(function(){
        let value = jQuery(this).val();
        if(value == "0" || value == "")
         {
            jQuery(this).addClass('is-invalid');
            jQuery(this).removeClass('is-valid');
            console.log(value);
         }
         else
         {
            jQuery(this).addClass('is-valid');
            jQuery(this).removeClass('is-invalid');
            console.log(value);
         }
       });
    
    jQuery('#sidebarCollapse').click(function() {
        jQuery('nav#sidebar').toggleClass('active');
    });

    jQuery('table.datagrid').DataTable({
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
});