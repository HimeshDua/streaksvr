import Tasks from '@/components/Tasks';

type Task = {
  id: string;
  title: string;
  description?: string;
  status: 'COMPLETED' | 'PENDING' | 'FAILED';
  createdAt: string;
};

const dummyTasks: Task[] = [
  {
    id: '1',
    title: 'Design UI for Dashboard',
    description:
      'Create wireframes and high-fidelity mockups for the main dashboard view.',
    createdAt: '2024-07-28T10:00:00Z',
    status: 'PENDING'
  },
  {
    id: '2',
    title: 'Implement User Authentication',
    description: 'Set up Firebase authentication for sign-in/sign-up.',
    createdAt: '2024-07-27T14:30:00Z',
    status: 'COMPLETED'
  },
  {
    id: '3',
    title: 'Write API Endpoints',
    description: 'Develop RESTful APIs for task CRUD operations.',
    createdAt: '2024-07-26T09:00:00Z',
    status: 'PENDING'
  },
  {
    id: '4',
    title: 'Create Task List',
    description: 'Build a component to display a task list.',
    createdAt: '2024-07-25T11:15:00Z',
    status: 'COMPLETED'
  },
  {
    id: '5',
    title: 'Database Connection',
    description: 'Configure Prisma with PostgreSQL.',
    createdAt: '2024-07-24T16:45:00Z',
    status: 'PENDING'
  },
  {
    id: '6',
    title: 'Unit Tests',
    description: 'Add unit tests for task functions.',
    createdAt: '2024-07-28T08:00:00Z',
    status: 'FAILED'
  },
  {
    id: '7',
    title: 'Deploy App',
    description: 'Deploy the app to production.',
    createdAt: '2024-07-29T13:00:00Z',
    status: 'PENDING'
  },
  {
    id: '8',
    title: 'Fix Bug in Login',
    description: 'Fix bug preventing Google sign-in.',
    createdAt: '2024-08-02T09:30:00Z',
    status: 'PENDING'
  },
  {
    id: '9',
    title: 'Add Search Functionality',
    description: 'Implement search in task list view.',
    createdAt: '2024-08-05T15:00:00Z',
    status: 'COMPLETED'
  },
  {
    id: '10',
    title: 'Update Documentation',
    description: 'Update docs to reflect recent changes.',
    createdAt: '2024-08-07T11:00:00Z',
    status: 'PENDING'
  }
];

export default function TasksPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto h-screen max-h-screen overflow-y-scroll">
      {/* <h1>Tasks</h1> */}
      <Tasks tasks={dummyTasks} />
    </div>
  );
}
