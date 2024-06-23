function Icon({color, size, d, strokeWidth}){
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            style={{"position": "relative", "display": "inline-block"}}
        >
            <path d={d} stroke={color} fill={color} stroke-width={strokeWidth}/>
        </svg>
    );
}

export default Icon;
