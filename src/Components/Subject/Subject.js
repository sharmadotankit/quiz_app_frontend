import SubjectTile from "../SubjectTile/SubjectTile";
import './Subject.css';

const Subject = ({onRouteChange,setTestInfo}) => {
    const subjects = ['linux', 'bash', 'docker', 'sql', 'cms', 'code', 'devops', 'uncategorized'];

    const testInfo = {
        subject: '',
        level: '',
    };

    const openModal = () => {
        const modal = document.getElementById("myModal");
        modal.style.display = "block";
    }

    const closeModal = () => {
        const modal = document.getElementById("myModal");
        modal.style.display = "none";
    }

    window.onclick = function (event) {
        const modal = document.getElementById("myModal");
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }

    const setTestSubject = (subjectName) => {
        testInfo.subject=subjectName
    }

    const setTestLevel = (selectedLevel) =>{
        testInfo.level=selectedLevel
        setTestInfo(testInfo)
        onRouteChange('quizTest')
    }


    return (
        <div className="SubjectsDiv">
            <h3 className="selectHeader"> Select subject for Quiz :</h3>
            {subjects.map((subjectName, i) => {
                return <SubjectTile key={i} openModal={openModal} subjectName={subjectName} setTestSubject={setTestSubject} />
            })}

            <div id="myModal" className="modal">
                <div className="modal-content">
                    <span onClick={closeModal} className="close">&times;</span>
                    <h3 className="selectHeader">Select difficulty of test: </h3>
                    <button onClick={()=>setTestLevel("Easy")}>Easy</button><br />
                    <button onClick={()=>setTestLevel("Medium")}>Medium</button><br />
                    <button onClick={()=>setTestLevel("Hard")}>Hard</button><br />
                </div>
            </div>

        </div>
    );
}

export default Subject;