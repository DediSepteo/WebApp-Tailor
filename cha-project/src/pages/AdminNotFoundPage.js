export const AdminNotFoundPage = () => (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1>404 - Page Not Found</h1>
        <p>The page you are looking for doesn't exist.</p>
        <button onClick={() => window.location.href = '/admin/dashboard'}>Go to Home</button>
    </div>
);
