import { useEffect, useState } from "react";
import supabase from "../config/supabaseClient";

export default function PersonListByAssociation({ associationId }) {
  const [fetchError, setFetchError] = useState(null);
  const [persons, setPersons] = useState(null);

  useEffect(() => {
    const fetchPersonsByAssociation = async () => {
      const { data, error } = await supabase
        .from("person")
        .select("firstname", "lastname")
        .eq("associationid", associationId)
        .join(
          {
            table: "membership",
            on: ["membershipid"],
          }
        );

      if (error) {
        setFetchError('Could not fetch persons');
        setPersons(null);
        console.error(error);
      }

      if (data) {
        setPersons(data);
        setFetchError(null);
      }
    };

    fetchPersonsByAssociation();
  }, [associationId]);

  return (
    <div>
      {fetchError && <p>{fetchError}</p>}
      {persons && (
        <div className="persons">
          {persons.map((person) => (
            <p key={person.personid}>{`${person.firstname} ${person.lastname}`}</p>
          ))}
        </div>
      )}
    </div>
  );
}