import './globals.css';

export default function About() {
    return (
        <main className="min-h-screen p-8">
            <div className="text-center">
                <h1 className="font-title text-3xl font-bold mb-4">About This Weather App</h1>
                <p className="mb-4">
                    This app uses the Visual Crossing Weather API to fetch current weather data for locations around the
                    world.
                </p>
                <p>
                    The API key is securely stored on the server and never exposed to the client.
                </p>
            </div>
        </main>
    );
}