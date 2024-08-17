import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function ExpandMore({
    expanded,
    onClick
}){
    return (
        <IconButton onClick={onClick}>
            <ExpandMoreIcon />
        </IconButton>
    )
}