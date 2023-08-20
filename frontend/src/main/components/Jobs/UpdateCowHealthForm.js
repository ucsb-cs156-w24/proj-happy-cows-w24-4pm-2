import { Button, Form } from "react-bootstrap";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useBackend } from "main/utils/useBackend";
import CommonsSelect from "main/components/Commons/CommonsSelect";

function UpdateCowHealthForm( { submitAction=()=>{}, testid = "UpdateCowHealthForm" } ) {

  // Stryker restore all

  const { data: commonsAll } = useBackend(
    ["/api/commons/all"],
    { url: "/api/commons/all" },
    []
  );

  const allCommonsProp = {"id":0,"name":"All Commons","cowPrice":10.0,"milkPrice":10.0,"startingBalance":100.0,"startingDate":"2023-08-20T00:00:00","showLeaderboard":false,"carryingCapacity":20,"degradationRate":0.008,"belowCapacityHealthUpdateStrategy":"Constant","aboveCapacityHealthUpdateStrategy":"Linear"}
  
  const commons = [allCommonsProp, ...commonsAll]

  const [selectedCommons, setSelectedCommons] = useState(null);
  const [selectedCommonsName, setSelectedCommonsName] = useState(null);

  const {
    handleSubmit,
  } = useForm();

  const handleCommonsSelection = (id, name) => {
    setSelectedCommons(id);
    setSelectedCommonsName(name);
  };

  const onSubmit = () => {
    const params = { selectedCommons, selectedCommonsName };
    submitAction(params);
  };

  if (!commons || commons.length === 0) {
    return <div>There are no commons on which to run this job.</div>;
  }

  if (selectedCommons === null) {
    setSelectedCommons(commons[0].id);
    setSelectedCommonsName(commons[0].name);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-3">
        <Form.Text htmlFor="description">
          Updated the cows' health in a single or all commons.
        </Form.Text>
      </Form.Group>

      <CommonsSelect commons={commons} selectedCommons={selectedCommons} handleCommonsSelection={handleCommonsSelection} testid={testid} />

      <Button type="submit" data-testid="SetCowHealthForm-Submit-Button">
        Update
      </Button>
     
  </Form>
  );
}
  
export default UpdateCowHealthForm;
  