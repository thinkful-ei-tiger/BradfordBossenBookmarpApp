import $ from 'jquery';
import api from './api'
import store from './store';

const generateBookmarkElement = function() {
    return $('.list').html(`<div class="initialView">
                <h3>OMG WOW</h3><h4>SOOO GOOD</h4>
            </div>`)
}

export default {
    generateBookmarkElement
}