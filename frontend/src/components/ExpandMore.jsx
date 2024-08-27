import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function ExpandMore({
    expanded,
    onClick
}){
    const getOrientation = () => {
        return expanded ? 'rotate-180' : 'rotate-0';
    }
    return (
        <IconButton onClick={onClick} className={`transform duration-500 ${getOrientation()}`}>
            <ExpandMoreIcon  />
        </IconButton>
    )
}