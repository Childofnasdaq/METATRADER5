import { useState } from 'react';

export default function Home() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [symbol, setSymbol] = useState('EURUSD');
    const [lotSize, setLotSize] = useState('0.1');
    const [tp, setTP] = useState('1.2000');
    const [sl, setSL] = useState('1.1800');
    const [status, setStatus] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        setStatus('Processing...');

        const res = await fetch('/api/trade', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ login, password, symbol, lotSize, tp, sl }),
        });

        const data = await res.json();
        setStatus(data.message);
    };

    return (
        <div>
            <h1>MetaTrader 5 Automated Trading</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    MT5 Login:
                    <input type="text" value={login} onChange={(e) => setLogin(e.target.value)} required />
                </label>
                <label>
                    MT5 Password:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </label>
                <label>
                    Symbol:
                    <input type="text" value={symbol} onChange={(e) => setSymbol(e.target.value)} required />
                </label>
                <label>
                    Lot Size:
                    <input type="text" value={lotSize} onChange={(e) => setLotSize(e.target.value)} required />
                </label>
                <label>
                    Take Profit:
                    <input type="text" value={tp} onChange={(e) => setTP(e.target.value)} required />
                </label>
                <label>
                    Stop Loss:
                    <input type="text" value={sl} onChange={(e) => setSL(e.target.value)} required />
                </label>
                <button type="submit">Place Trade</button>
            </form>
            <p>{status}</p>
        </div>
    );
}
