import React, { useEffect, useRef, useState } from "react";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonTitle,
  IonToolbar,
  useIonActionSheet,
} from "@ionic/react";
import { Habit } from "../types";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { habitsState } from "../stores/habitStore";
import { v4 as uuid } from "uuid";
import ScheduleModal from "./ScheduleModal";
import { monthsMap, scheduleEveryList, weekDaysMap } from "../consts";
import { Weekday } from "@capacitor/local-notifications";

interface HabitModalProps {
  habit?: Habit;
  children: JSX.Element;
}

const HabitModal: React.FC<HabitModalProps> = ({ habit, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [habits, setHabits] = useRecoilState(habitsState);
  const {
    control,
    handleSubmit,
    register,
    reset,
    getValues,
    formState: { errors },
  } = useForm<Habit>({
    defaultValues: habit || {
      id: uuid(),
      tags: [],
      schedules: [],
    },
  });
  const {
    fields: schedules,
    append: schedulesAppend,
    update: schedulesUpdate,
    remove: schedulesRemove,
  } = useFieldArray({
    control,
    name: "schedules",
  });

  const [present] = useIonActionSheet();

  const onSubmit: SubmitHandler<Habit> = (data) => {
    console.log("onSubmit", data);
    const newHabit: Habit = {
      id: data.id,
      title: data.title,
      description: data.description,
      priority: data.priority,
      schedules: data.schedules,
      tags: data.tags,
    };

    setHabits({ ...habits, [newHabit.id]: newHabit });

    if (!habit) {
      reset();
    }

    setIsOpen(false);
  };

  const deleteHabit = () => {
    present({
      buttons: [
        {
          text: "Delete",
          role: "confirm",
        },
        {
          text: "Cancel",
          role: "cancel",
        },
      ],
      onWillDismiss: (ev) => {
        if (ev.detail.role === "confirm") {
          if (habit) {
            setHabits((habits) => {
              const copy = { ...habits };
              delete copy[habit.id];
              return copy;
            });
          }
          setIsOpen(false);
        }
      },
    });
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton onClick={() => setIsOpen(false)}>Cancel</IonButton>
              </IonButtons>
              <IonTitle>{habit?.title || "New Habit"}</IonTitle>
              <IonButtons slot="end">
                <IonButton strong={true} type="submit">
                  Save
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding" class="h-screen">
            <IonList>
              <IonItem lines="inset">
                <IonInput
                  labelPlacement="floating"
                  label="Name"
                  {...register("title", { required: "Title is required." })}
                ></IonInput>
              </IonItem>
              <IonItem lines="inset">
                <IonInput
                  labelPlacement="floating"
                  label="Description"
                  {...register("description")}
                ></IonInput>
              </IonItem>
              <IonItem lines="none">
                <IonLabel>Schedule</IonLabel>
                <ScheduleModal append={schedulesAppend}>
                  <IonButton>Add</IonButton>
                </ScheduleModal>
              </IonItem>
              {schedules.map((schedule, index) => (
                <IonItem lines="none" key={schedule.id}>
                  <ScheduleModal
                    index={index}
                    value={schedule}
                    update={schedulesUpdate}
                  >
                    <div className="flex gap-2">
                      <div>Every {schedule.every}</div>
                      {schedule.every === "hour" && (
                        <div>At Minute {schedule.on?.minute}</div>
                      )}
                      {schedule.every === "day" && (
                        <div>
                          On {schedule.on?.hour}:{schedule.on?.minute}
                        </div>
                      )}
                      {schedule.every === "week" && (
                        <div>
                          On{" "}
                          {Object.keys(weekDaysMap).find((k) => {
                            return (
                              weekDaysMap[k as keyof typeof weekDaysMap] ===
                              schedule.on?.weekday
                            );
                          })}
                          {" Time "}
                          {schedule.on?.hour}:{schedule.on?.minute}{" "}
                        </div>
                      )}
                      {(schedule.every === "two-weeks" ||
                        schedule.every === "month") && (
                        <div>
                          On Day {schedule.on?.day}
                          {" Time 	"}
                          {schedule.on?.hour}:{schedule.on?.minute}{" "}
                        </div>
                      )}
                      {schedule.every === "year" && (
                        <div>
                          On{" "}
                          {Object.keys(monthsMap).find((k) => {
                            return (
                              monthsMap[k as keyof typeof monthsMap] ===
                              schedule.on?.month
                            );
                          })}{" "}
                          Day {schedule.on?.day}
                          {" Time 	"}
                          {schedule.on?.hour}:{schedule.on?.minute}{" "}
                        </div>
                      )}
                    </div>
                  </ScheduleModal>
                </IonItem>
              ))}
              {habit && (
                <IonItem lines="none">
                  <IonButton
                    onClick={() => {
                      deleteHabit();
                    }}
                  >
                    Delete
                  </IonButton>
                </IonItem>
              )}
            </IonList>
          </IonContent>
        </form>
      </IonModal>
    </>
  );
};

export default HabitModal;
