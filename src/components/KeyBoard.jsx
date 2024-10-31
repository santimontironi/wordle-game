import '../assets/css/keyboard.css'

export default function KeyBoard({onKeyPress}) {

    const keys = [
        ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
        ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
        ["Eliminar", "Z", "X", "C", "V", "B", "N", "M","Enter"]
    ]

    return (
        <div className="keyboard">
            {keys.map((row,rowIndex) =>  (
                <div key={rowIndex} className="rowKeyBoard">
                    {row.map((key) => (
                        <button key={key} className="key" onClick={() => onKeyPress(key)}>
                            {key === 'Eliminar' ? "❌" : key && key === 'Enter' ? "✅" : key}
                        </button>
                    ))}
                </div>
            ))}
        </div>
    )
}
