export const NotFoundPage = () => (
    <main style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ textAlign: 'center' }}>
            <h1>404 - Page Not Found</h1>
            <p>The page you are looking for doesn't exist.</p>
            <button onClick={() => window.location.href = '/home'}>Go to Home</button>
        </div>
    </main>
);
