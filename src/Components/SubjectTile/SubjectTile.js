import './SubjectTile.css';

const SubjectTile = ({ subjectName, openModal, setTestSubject }) => {
    return (
        <div
            onClick={
                () => {
                    openModal()
                    setTestSubject(subjectName)
                }
            }
            className="SubjectTile"
        >
            <p className="SubjectHeader">{subjectName}</p>
        </div>
    );
}

export default SubjectTile;