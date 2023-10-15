import React, { useEffect, useRef, useState } from "react";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonModal,
  IonTitle,
  IonToggle,
  IonToolbar,
  useIonActionSheet,
} from "@ionic/react";
import { Habit } from "../types";
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { useRecoilState } from "recoil";
import { habitsState } from "../stores/habitStore";
import { v4 as uuid } from "uuid";
import ScheduleModal from "./ScheduleModal";
import { monthsMap, scheduleEveryList, weekDaysMap } from "../consts";
import { Weekday } from "@capacitor/local-notifications";
import { timeFormat } from "../utils/time";
import { addNotifications } from "../lib/localnotification";
import { randSeedRange } from "../utils/randseed";
import { Cron } from "react-js-cron";
import { notifications } from "ionicons/icons";

interface HabitModalProps {
  isNew: boolean;
  habit?: Habit;
  children: JSX.Element;
}

const HabitModal: React.FC<HabitModalProps> = ({ isNew, habit, children }) => {
  const defaultHabit = habit || {
    id: uuid(),
    tags: [],
    schedules: [],
    isNotification: true,
  };

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
    defaultValues: defaultHabit,
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
    const newHabit: Habit = {
      id: data.id,
      title: data.title,
      description: data.description,
      priority: data.priority,
      schedules: data.schedules,
      tags: data.tags,
      isNotification: data.isNotification,
    };

    console.log("add newHabit", newHabit);

    setHabits({ ...habits, [newHabit.id]: newHabit });

    if (isNew) {
      reset();
    }

    setIsOpen(false);

    addNotifications(newHabit).then((result) => console.log(result));
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
          if (!isNew && habit) {
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
          if (isNew) {
            reset({
              ...defaultHabit,
              id: uuid(), // new id
            });
          }
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
          <IonContent className="h-screen">
            <IonList>
              <IonItem lines="full">
                <IonInput
                  labelPlacement="floating"
                  label="Name"
                  {...register("title", { required: "Title is required." })}
                ></IonInput>
              </IonItem>
              <IonItem lines="full">
                <IonInput
                  labelPlacement="floating"
                  label="Description"
                  {...register("description")}
                ></IonInput>
              </IonItem>
              <IonItem lines="full">
                <Controller
                  control={control}
                  name="isNotification"
                  defaultValue={true}
                  render={({ field: { onChange, value } }) => (
                    <IonToggle
                      checked={value}
                      onClick={(event) => {
												// simulate event target value for onChange												
                        const newEvent = Object.defineProperty(event, "target", {
                          writable: false,
                          value: {
                            value: !value, // toggle true/falase
                          },
                        });
                        onChange(newEvent);
                      }}
                    >
                      Reminder
                    </IonToggle>
                  )}
                />
              </IonItem>
              <IonItem lines="none">
                <IonLabel>Schedules</IonLabel>
                <ScheduleModal append={schedulesAppend}>
                  <IonButton>Add</IonButton>
                </ScheduleModal>
              </IonItem>
              {schedules.map((schedule, index) => (
                <IonItem
                  lines={schedules.length === index + 1 ? "full" : "inset"}
                  key={schedule.id}
                >
                  <ScheduleModal
                    index={index}
                    value={schedule}
                    update={schedulesUpdate}
                    remove={schedulesRemove}
                  >
                    <Cron
                      value={schedule.corn}
                      setValue={() => {}}
                      clearButton={false}
                      humanizeLabels={false}
                      readOnly={true}
                      className="text-xs pt-2"
                    ></Cron>
                  </ScheduleModal>
                </IonItem>
              ))}
              {!isNew && (
                <IonItem lines="none">
                  <IonButton
                    onClick={() => {
                      deleteHabit();
                    }}
                    color="danger"
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
