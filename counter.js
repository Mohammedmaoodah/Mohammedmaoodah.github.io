// Initialize page view counter with Firebase
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Firebase
    try {
        firebase.initializeApp(firebaseConfig);
        console.log('Firebase initialized successfully');
        const analytics = firebase.analytics();
        const db = firebase.firestore();
        console.log('Firestore accessed successfully');
        
        // Reference to the counter document
        const viewsRef = db.collection('nam5').doc('pageviews');

        // Find the footer text element
        const footerText = document.querySelector('footer .container p');
        
        // Create counter element
        const counterSpan = document.createElement('span');
        counterSpan.className = 'ms-3';
        counterSpan.innerHTML = `
            <span class="text-muted">|</span>
            <span class="ms-3">Views: 
                <span id="view-count">
                    <span class="spinner-border spinner-border-sm text-light" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </span>
                </span>
            </span>
        `;

        // Add counter to footer
        footerText.appendChild(counterSpan);

        // Initialize or increment the counter
        viewsRef.get().then((doc) => {
            if (!doc.exists) {
                console.log('Creating initial counter document...');
                // Initialize counter if it doesn't exist
                viewsRef.set({
                    total: 1,
                    lastUpdated: new Date().toISOString()
                }).then(() => {
                    console.log('Counter initialized with 1 view');
                }).catch(error => {
                    console.error('Error initializing counter:', error);
                    document.getElementById('view-count').textContent = 'Error';
                });
            } else {
                console.log('Current count:', doc.data().total);
                // Increment the counter
                viewsRef.update({
                    total: firebase.firestore.FieldValue.increment(1),
                    lastUpdated: new Date().toISOString()
                }).then(() => {
                    console.log('Counter incremented');
                }).catch(error => {
                    console.error('Error incrementing counter:', error);
                    document.getElementById('view-count').textContent = 'Error';
                });
            }
        }).catch(error => {
            console.error('Error accessing counter:', error);
            document.getElementById('view-count').textContent = 'Error';
        });

        // Real-time counter update
        viewsRef.onSnapshot((doc) => {
            if (doc.exists) {
                const total = doc.data().total || 0;
                document.getElementById('view-count').textContent = total.toLocaleString();
                console.log('Counter updated:', total);
                
                // Log pageview to analytics
                analytics.logEvent('page_view');
            }
        }, error => {
            console.error('Error in real-time updates:', error);
            document.getElementById('view-count').textContent = 'Error';
        });
    } catch (error) {
        console.error('Firebase initialization error:', error);
        const viewCount = document.getElementById('view-count');
        if (viewCount) {
            viewCount.textContent = 'Error';
        }
    }
});
