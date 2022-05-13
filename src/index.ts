(() => {
    enum NotificationPlatform {
        SMS = 'SMS',
        EMAIL = 'EMAIL',
        PUSH_NOTIFICATION = 'PUSH_NOTIFICATION',
    }

    const DateUtils = {
        today(): Date {
            return new Date();
        },
        tomorrow(): Date {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            return tomorrow
        },
        formDate(date: Date): string {
            return `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`
        },
    };

    const UUID = (): string => {
        return Math.random.toString().substring(2, 9);
    };

    interface Task {
        id: string,
        dateCreated: Date,
        dateUpdated: Date,
        description: string,
        render(): string;
    }

    class Reminder implements Task {
        id: string = UUID();
        dateCreated: Date = DateUtils.today();
        dateUpdated: Date = DateUtils.today();
        description: string = '';

        date: Date = DateUtils.tomorrow();
        notifications: Array<NotificationPlatform> = [NotificationPlatform.EMAIL];

        constructor(description: string, date: Date, notifications: Array<NotificationPlatform>) {
            this.description = description;
            this.date = date;
            this.notifications = notifications;
        }

        render(): string {
            return `
            description: ${this.description}
            date: ${DateUtils.formDate(this.date)}
            platform: ${this.notifications.join(',')}
            `;
        }
    }

    class Todo implements Task {
        id: string = UUID();
        dateCreated: Date = DateUtils.today();
        dateUpdated: Date = DateUtils.today();
        description: string = '';

        done: boolean = false;

        constructor(description: string) {
            this.description = description;
        }

        render(): string {
            return `
            description: ${this.description},
            done: ${this.done},
            `;
        }
    }

    const todo = new Todo("Class Todo");
    const reminder = new Reminder("Class Reminder", new Date(), [NotificationPlatform.EMAIL]);

    const taskView = {
        render(tasks: Array<Task>) {
            const tasksList = document.getElementById('tasksList');

            while (tasksList?.firstChild) {
                tasksList.removeChild(tasksList.firstChild);
            }

            tasks.forEach(task => {
                const li = document.createElement('LI');
                const textNode = document.createTextNode(task.render());
                li.appendChild(textNode);

                tasksList?.appendChild(li);
            })

        }
    };

    const TaskController = (view: typeof taskView) => {
        const tasks: Array<Task> = [todo, reminder];

        const handleEvent = (event: Event) => {
            event.preventDefault();
            view.render(tasks);
        }

        document.getElementById('taskForm')?.addEventListener('submit', handleEvent);
    }

    TaskController(taskView);
})();
