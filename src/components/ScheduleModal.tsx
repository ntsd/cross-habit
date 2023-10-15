import React, { useState } from "react";
import {
  IonContent,
  IonLabel,
  IonInput,
  IonButton,
  IonSelect,
  IonSelectOption,
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonItem,
  IonList,
} from "@ionic/react";
import {
  FieldArrayWithId,
  SubmitHandler,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  UseFieldArrayUpdate,
  useForm,
} from "react-hook-form";
import { Habit } from "../types";
import { monthsMap, scheduleEveryList, weekDaysMap } from "../consts";
import { v4 as uuid } from "uuid";
import { randSeedRange } from "../utils/randseed";
import { Cron } from "react-js-cron";
import "react-js-cron/dist/styles.css";

interface ScheduleModalProps {
  children: JSX.Element;

  index?: number;
  value?: FieldArrayWithId<Habit, "schedules", "id">;
  update?: UseFieldArrayUpdate<Habit, "schedules">;
  append?: UseFieldArrayAppend<Habit, "schedules">;
  remove?: UseFieldArrayRemove;
}

const ScheduleModal: React.FC<ScheduleModalProps> = ({
  index,
  children,
  value,
  update,
  append,
  remove,
}) => {
  const id = uuid();
  const defaultSchedule = value || {
    id: id,
    corn: "0 * * * *",
  };

  const [cron, setCron] = useState(defaultSchedule.corn);

  const [isOpen, setIsOpen] = useState(false);

  const onSave = () => {
    if (update && index !== undefined) {
      update(index, {
        id: id,
        corn: cron,
      });
    }

    if (append) {
      append({
        id: id,
        corn: cron,
      });
    }

    setIsOpen(false);
  };

  const deleteSchedule = () => {
    if (remove) {
      remove(index);
    }
    setIsOpen(false);
  };

  return (
    <>
      <span
        onClick={() => {
          setIsOpen(true);
        }}
      >
        {children}
      </span>
      <IonModal onDidDismiss={() => setIsOpen(false)} isOpen={isOpen}>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton onClick={() => setIsOpen(false)}>Cancel</IonButton>
            </IonButtons>
            <IonTitle>{"Schedule"}</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => onSave()} strong={true} type="submit">
                Save
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            <IonItem lines="none">
              <Cron
                value={cron}
                setValue={setCron}
                allowedPeriods={["year", "month", "week", "day", "hour"]}
              />
            </IonItem>
            {value && (
              <IonItem lines="none">
                <IonButton
                  onClick={() => {
                    deleteSchedule();
                  }}
                  color="danger"
                >
                  Delete
                </IonButton>
              </IonItem>
            )}
          </IonList>
        </IonContent>
      </IonModal>
    </>
  );
};

export default ScheduleModal;
