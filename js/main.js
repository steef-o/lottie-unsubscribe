'use strict';

const letterContainer = document.getElementById('unsubscribe-letter');
const blobContainer = document.getElementById('bg-blob');
const heartBlobContainer = document.getElementById('heart-blob');
const confettiContainer = document.getElementById('confetti');

const unsubscribeButton = document.getElementById('unsubscribe-button');
const cancelButton = document.getElementById('cancel-button');
const backButton = document.getElementById('back-button');

const heading = document.getElementById('heading');
const subHeading = document.getElementById('sub-heading');

const letter = lottie.loadAnimation({
    container: letterContainer,
    renderer: 'svg',
    autoplay: false,
    loop: false,
    path: 'data/letter.v04.json'
});

const blob = lottie.loadAnimation({
    container: blobContainer,
    renderer: 'svg',
    autoplay: true,
    loop: true,
    path: 'data/bg-blob.v01.json'
});

const heartBlob = lottie.loadAnimation({
    container: heartBlobContainer,
    renderer: 'svg',
    autoplay: false,
    loop: false,
    path: 'data/heart-blob.v01.json'
});

blob.setSpeed(0.5);

letter.addEventListener('DOMLoaded', function() {
    // Get Eye and eyebrow references
    const leftEye = new Eye(
        document.getElementById('left-eye').children[0].children[0]
    );

    const leftEyeBrow = new Eye(
        document.getElementById('left-eyebrow').children[0].children[0]
    );
    const rightEye = new Eye(
        document.getElementById('right-eye').children[0].children[0]
    );

    const rightEyeBrow = new Eye(
        document.getElementById('right-eyebrow').children[0].children[0]
    );

    // Eye movement based on user mouse input
    document.addEventListener('mousemove', function(e) {
        let x = Math.floor(e.clientX);
        let y = Math.floor(e.clientY);

        leftEye.findPosition(x, y);
        leftEyeBrow.findPosition(x, y);
        rightEye.findPosition(x, y);
        rightEyeBrow.findPosition(x, y);
    });

    // Listen for hover actions
    unsubscribeButton.addEventListener('mouseover', function(e) {
        letter.playSegments([[2, 10], [10, 16]], true);
        letter.loop = true;
    });

    unsubscribeButton.addEventListener('mouseleave', function(e) {
        if (!cancelButton.classList.contains('hide')) {
            letter.playSegments([15, 26], true);
            letter.loop = false;
        }
    });

    cancelButton.addEventListener('mouseover', function(e) {
        letter.playSegments([40, 55], true);
    });

    cancelButton.addEventListener('mouseleave', function(e) {
        if (!cancelButton.classList.contains('hide')) {
            letter.playSegments([55, 70], true);
        }
    });

    // Listen for clicks
    cancelButton.addEventListener('click', function() {
        heading.innerText = 'Thanks for staying with us!';
        subHeading.innerText =
            'You will continue receiving our weekly newsletter. Yay!';

        letter.playSegments([80, 169], true);
        letter.loop = true;

        heartBlob.playSegments([[1, 30], [30, 70]], true);
        heartBlob.loop = true;

        heartBlobContainer.classList.remove('hide');
        blobContainer.classList.add('hide');
        backButton.classList.remove('hide');
        unsubscribeButton.classList.add('hide');
        cancelButton.classList.add('hide');
    });

    unsubscribeButton.addEventListener('click', function() {
        letter.loop = false;
        letter.playSegments([30, 35], true);

        heading.innerText = 'We are sad to see you go!';
        subHeading.innerText =
            'You have been unsubscribed and will no longer hear from us.';

        backButton.classList.remove('hide');
        unsubscribeButton.classList.add('hide');
        cancelButton.classList.add('hide');
    });

    // back to default
    backButton.addEventListener('click', function() {
        // reset animation
        letter.loop = false;
        letter.playSegments([1, 2], true);

        heading.innerText = 'Do you want to unsubscribe?';
        subHeading.innerText =
            'If you unsubscribe, you will stop receiving our weekly newsletter.';

        blobContainer.classList.remove('hide');
        heartBlobContainer.classList.add('hide');
        backButton.classList.add('hide');
        unsubscribeButton.classList.remove('hide');
        cancelButton.classList.remove('hide');
    });
});
