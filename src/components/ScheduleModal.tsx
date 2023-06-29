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
  UseFieldArrayUpdate,
  useForm,
} from "react-hook-form";
import { Habit } from "../types";
import { monthsMap, scheduleEveryList, weekDaysMap } from "../consts";

interface ScheduleModalProps {
  children: JSX.Element;

  index?: number;
  value?: FieldArrayWithId<Habit, "schedules", "id">;
  update?: UseFieldArrayUpdate<Habit, "schedules">;

  append?: UseFieldArrayAppend<Habit, "schedules">;
}

const ScheduleModal: React.FC<ScheduleModalProps> = ({
  index,
  children,
  value,
  update,
  append,
}) => {
  const defaultSchedule = value || {
    every: "hour",
    on: {
      month: 1,
			weekday: 1,
      day: 1,
      hour: 0,
      minute: 0,
      second: 0,
    },
  };

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: defaultSchedule,
  });

  const [isOpen, setIsOpen] = useState(false);

  const [scheduleEvery, setScheduleEvery] = useState(defaultSchedule.every || "hour");

  const onSave: SubmitHandler<FieldArrayWithId<Habit, "schedules", "id">> = (
    data
  ) => {
    if (update && index !== undefined) {
      update(index, data);
    }

    if (append) {
      append(data);
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
              <IonButton
                onClick={handleSubmit(onSave)}
                strong={true}
                type="submit"
              >
                Save
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="h-screen">
          <IonList>
            <IonItem lines="inset">
              <IonSelect
                label="Every"
                interface="popover"
                onIonChange={(e) => setScheduleEvery(e.target.value)}
                {...register(`every`, {
                  required: "Schedule every is required",
                })}
              >
                {scheduleEveryList.map((option, index) => (
                  <IonSelectOption value={option} key={index}>
                    {option}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>
            <IonItem lines="none">
              <IonLabel>On</IonLabel>
            </IonItem>
            {scheduleEveryList.indexOf(scheduleEvery) > 4 && (
              <IonItem lines="none">
                <IonSelect
                  label="Month"
                  interface="popover"
									{...register(`on.month`, {
                    max: 12,
                    min: 1,
										valueAsNumber: true
                  })}
                >
                  {Object.entries(monthsMap).map((month, index) => (
                    <IonSelectOption value={month[1]} key={index}>
                      {month[0]}
                    </IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>
            )}
            {scheduleEveryList.indexOf(scheduleEvery) > 2 && (
              <IonItem lines="none">
                <IonInput
                  label="Day"
                  labelPlacement="floating"
                  type="number"
                  max={31}
                  min={1}
                  {...register(`on.day`, {
                    max: 31,
                    min: 1,
										valueAsNumber: true
                  })}
                />
              </IonItem>
            )}
            {scheduleEveryList.indexOf(scheduleEvery) === 2 && (
              <IonItem lines="none">
                <IonSelect
                  label="Weekday"
                  interface="popover"
									{...register(`on.weekday`, {
                    max: 7,
                    min: 1,
										valueAsNumber: true
                  })}
                >
                  {Object.entries(weekDaysMap).map((day, index) => (
                    <IonSelectOption value={day[1]} key={index}>
                      {day[0]}
                    </IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>
            )}
            {scheduleEveryList.indexOf(scheduleEvery) > 0 && (
              <IonItem lines="none">
                <IonInput
                  label="Hour"
                  labelPlacement="floating"
                  type="number"
                  max={23}
                  min={0}
                  {...register(`on.hour`, {
                    max: 23,
                    min: 0,
										valueAsNumber: true
                  })}
                />
              </IonItem>
            )}
            <IonItem lines="none">
              <IonInput
                label="Minute"
                labelPlacement="floating"
                type="number"
                max={59}
                min={0}
                {...register(`on.minute`, {
                  max: 59,
                  min: 0,
									valueAsNumber: true
                })}
              />
            </IonItem>
          </IonList>
        </IonContent>
      </IonModal>
    </>
  );
};

export default ScheduleModal;
