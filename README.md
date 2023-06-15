# Cross Habit

A open source cross platform habit tracker.

## Features

- Habit - trak your daily, weekly, monthly, or any routine habit.
- Reminders - notification your habit and task.
- Statistic - track your habit statistics and goal.
- Schedules - flixible schedules.
- Time range - set start and end time of the routine habbit for example if you sleep at 3am can set the new day start at 3am insted of midnight.
- Open source - no advertisements and open source.
- Cloud sync - login to your Google account to sync your habbit and task.
- Auto Start and background - start when turn on the phone and keep it running on background.

## Diagram

```mermaid
---
title: Cross Habit
---
erDiagram
    Habbits {
        string id
        string name "name of the habbit"
        string description "description or note"
        int priority  "lower is more, put to top of the list"
    }
    Tags {
        string id
        string name "tag name"
        string color "color of the tag"
    }
    HabbitTags {
        string habitID
        string tagID
    }
    Schedules {
        string id
        string habitID "one habit can have multiple schedules"
        string[] days "days list of week"
        cron startCron ""
        cron endCron ""
    }
    Tasks {
        number id "task and notification id"
        string habitID "one habbit can have multiple tasks"
        datetime startTime "the started time"
        datetime endTime "the ended time"
        datetime skipedAt "time when the task skiped"
        datetime failedAt "time when the task failed"
        datetime successAt "time when the task success"
        string status "success|skiped|failed"
    }
```

Local Notifications: https://capacitorjs.com/docs/apis/local-notifications

## Development

## Links

### Background

<https://capacitorjs.com/docs/v2/apis/background-task>
<https://capacitorjs.com/docs/v2/apis/status-bar>

### Schedule

<https://capacitorjs.com/docs/v2/apis/local-notifications>
<https://github.com/sojinantony01/react-cron-generator>
<https://capacitorjs.com/docs/v2/apis/push-notifications>
<https://github.com/Fir3st/capacitor-calendar>
<https://github.com/go-u/capacitor-alarm-notification>
