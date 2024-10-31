import '../assets/css/square.css'

export default function Square({ value, correct, present }) {
    return (
        <div className={`square ${correct ? 'correct' : present ? 'present' : ''}`}>
            {value}
        </div>
    )
}
