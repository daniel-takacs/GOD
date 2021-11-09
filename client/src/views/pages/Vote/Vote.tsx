import React, { FC } from "react";



//material-ui styles
import AddIcon from "@mui/icons-material/Add";
import { Button, Tabs, Tab } from "@mui/material";
import VoteCard from "../../components/VoteCard/VoteCard";


const Vote: FC = () => {
  const [selectedTab, setSelectedTab] = React.useState(0);
  const hendelTapTab = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };
  const props = [{
    status: "Draft",
    votes: 0,
    title: "Rainforest global responsibility",
    questionId: 1
  }, {
    status: "Draft",
    votes: 0,
    title: "Rainforest global responsibility",
    questionId: 2
  }, {
    status: "Published",
    votes: 55,
    title: "Inequality During Pandemic",
    questionId: 3
  }]



  return (
    <>
      <div className="buttons">
        <img
          className="logo"
          src={process.env.PUBLIC_URL + "/logo.png"}

        ></img>

        <div style={{ display: "flex", alignItems: "center" }}>
          <Button
            variant="contained"
            style={{
              borderRadius: 10,
              backgroundColor: "rgb(204 146 58)",
              textTransform: "capitalize",
              fontFamily: "sans-serif",
              height: "1.5em",
              marginRight: "1em",
              fontSize: "0.8em",
              paddingTop: "0.7em",
              letterSpacing: "0",
              width: "6em",
            }}
            startIcon={
              <AddIcon
                style={{ fontSize: "1.2em", padding: "0 0 0.1em 0.5em" }}
              />
            }
          >
            Create
          </Button>
        </div>
      </div>

      <div className="TabsWrapper">
        <Tabs value={selectedTab} onChange={hendelTapTab}>
          <Tab label="My Questions" />
          <Tab label="Ongoing" />
          <Tab label="Pending" />
          <Tab label="Past" />
        </Tabs>

      </div >
      <div className="voteListWrapper">
        {selectedTab === 0 && <div className="vote-list">
          {props.map(item => <VoteCard />)}

        </div>}
        {selectedTab === 1 && <div className="inProgress">Ongoing Page</div>}
        {selectedTab === 2 && <div className="inProgress">Pending Page</div>}
        {selectedTab === 3 && <div className="inProgress">Past Pages</div>}
      </div>

    </>
  );
};
export default Vote;
