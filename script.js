// scripts.js

// Define your API key here
const apiKey = '6781e32ffae5934196055b667895b3f5'; // Replace 'YOUR_API_KEY' with your actual WeatherAPI key

document.getElementById('soil-form').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the form from submitting the default way

    const location = document.getElementById('location').value;

    try {
        // Fetch weather alerts from WeatherAPI
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&appid=${apiKey}`);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();

        // Display the alerts
        displayAlerts(data);
    } catch (error) {
        console.error('Error fetching weather alerts:', error);
        document.getElementById('alert-results').innerText = 'Failed to fetch weather alerts. Please check your request.';
    }
});

function displayAlerts(data) {
    const alertResults = document.getElementById('alert-results');
    if (data.alerts && data.alerts.length > 0) {
        // Display alerts
        alertResults.innerHTML = '<h2>Weather Alerts:</h2>';
        data.alerts.forEach(alert => {
            alertResults.innerHTML += `<p><strong>${alert.title}</strong>: ${alert.description}</p>`;
        });
    } else {
        alertResults.innerText = 'No weather alerts for this location.';
    }
}

// Handle the contact form submission
document.getElementById('contact-form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent the form from submitting the default way

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    try {
        // Replace with your API endpoint to send contact messages
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, message })
        });

        if (response.ok) {
            document.getElementById('contact-form').reset();
            alert('Your message has been sent successfully.');
        } else {
            alert('Failed to send your message. Please try again.');
        }
    } catch (error) {
        console.error('Error sending contact message:', error);
        alert('An error occurred while sending your message. Please try again.');
    }
});
