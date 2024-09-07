import toast from 'react-hot-toast';

const CustomToast = ({ title = 'Toast Title', body = 'This is toast message', icon = '⚠️' }) => {
  return toast(
    (t) => (
      <span className="flex justify-between items-center">
        <span>
          <b>{title}</b>
          <br />
          {body}
        </span>
        <button
          className="ml-2 py-2 h-fit rounded-md px-4 border bg-[#424242] text-[#F5F5F5] hover:bg-[#616161]"
          onClick={() => toast.dismiss(t.id)}
        >
          Dismiss
        </button>
      </span>
    ),
    {
      duration: 6000,
      icon: icon,
      style: {
        borderRadius: '12px',
        background: '#212121',
        color: '#fff',
      },
    }
  );
};

export default CustomToast;
