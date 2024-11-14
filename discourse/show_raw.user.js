// ==UserScript==
// @name         Discourse Raw Link
// @namespace    https://github.com/vbrozik
// @version      0.1
// @description  Add a clickable "raw" link to each article element in Discourse topics.
// @author       Václav Brožík
// @match        https://discuss.python.org/t/*/*
// @grant        none
// @updateURL    https://cdn.jsdelivr.net/gh/vbrozik/userscripts@latest/discourse/show_raw.user.js
// @downloadURL  https://cdn.jsdelivr.net/gh/vbrozik/userscripts@latest/discourse/show_raw.user.js
// ==/UserScript==

(function() {
    'use strict';

    const addRawLinks = () => {
        const articles = document.querySelectorAll('#topic article[data-post-id]');
        articles.forEach(article => {
            if (article.querySelector('.raw-link')) {
              return;   // Prevent duplicates
            }

            const postId = article.getAttribute('data-post-id');
            if (!postId) {
              return;
            }

            const rawLink = document.createElement('a');
            rawLink.href = `/posts/${postId}/raw`;
            rawLink.target = '_blank';
            rawLink.textContent = 'raw';
            rawLink.className = 'raw-link';
            rawLink.style.marginLeft = '10px'; // Optional: Add some spacing

            article.appendChild(rawLink);
        });
    }

    document.addEventListener('DOMContentLoaded', addRawLinks);

    const observer = new MutationObserver(addRawLinks);
    observer.observe(document.body, { childList: true, subtree: true });
})();
