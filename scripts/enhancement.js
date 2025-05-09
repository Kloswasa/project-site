"use strict";
/*Enhancement 2*/
$(document).ready(function() {
    
    $('.dl').each(function() {
        var $jobListing = $(this);
        var deadline = new Date($jobListing.data('deadline')).getTime();
        var jobId = $jobListing.find('.appbutn').data('job-id');

        var x = setInterval(function() {
            var now = new Date().getTime();
            var distance = deadline - now;
            
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

            $jobListing.find('.deadline').html(days + "d " + hours + "h " + minutes + "m ");

            if (distance < 0) {
                clearInterval(x);
                $jobListing.find('.appbutn').removeAttr('href');
                $jobListing.find('.appbutn').addClass('disabled');
                $jobListing.find('.deadline').html('JOB EXPIRED');
            }
        }.bind(this), 1000); 
    });
});


/*Enhancement 1*/

function showSection(sectionId) {
    const sections = document.querySelectorAll('.job-section');
    sections.forEach(section => {
        if (sectionId === 'all' || section.id === sectionId) {
            section.style.display = 'block';
        } else {
            section.style.display = 'none';
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const sectionSelector = document.querySelector('#jobCategory');
    sectionSelector.addEventListener('change', function() {
        const selectedValue = this.value;
        showSection(selectedValue);
    });

    showSection('all');
});




