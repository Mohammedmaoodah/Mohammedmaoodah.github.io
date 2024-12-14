// Initialize visitor counter with Firebase
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    const analytics = firebase.analytics();
    const db = firebase.firestore();
    const visitorRef = db.collection('nam5').doc('pageviews');

    // Create counter element
    const counterDiv = document.createElement('div');
    counterDiv.className = 'bg-light py-4';
    counterDiv.innerHTML = `
        <div class="container text-center">
            <h5 class="mb-3">Total Page Views</h5>
            <div class="row justify-content-center">
                <div class="col-md-6">
                    <div id="visitor-count" class="h4">
                        <div class="spinner-border text-primary" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Insert before footer
    const footer = document.querySelector('footer');
    footer.parentNode.insertBefore(counterDiv, footer);

    // Increment counter for every page view
    visitorRef.get().then((doc) => {
        if (!doc.exists) {
            // Initialize counter if it doesn't exist
            return visitorRef.set({ total: 1 });
        } else {
            // Increment the counter
            return visitorRef.update({
                total: firebase.firestore.FieldValue.increment(1)
            });
        }
    }).catch(error => console.error('Error:', error));

    // Real-time counter update
    visitorRef.onSnapshot((doc) => {
        if (doc.exists) {
            const count = doc.data().total || 0;
            document.getElementById('visitor-count').textContent = count.toLocaleString();
            
            // Log pageview to analytics
            analytics.logEvent('page_view');
        }
    });
});
