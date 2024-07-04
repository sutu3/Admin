import { Progress, Tooltip } from "@nextui-org/react";

const App = ({step}) => {
    console.log(step)


  return (
    <div className='w-[100px] flex flex-col translate-x-10 '>
      {step.map((el, index) => (
        <div key={el.label} className='flex flex-col w-full h-full justify-start items-center'>
          
            <span className={`${step[index !== 0 ? index - 1 : index].value !== 0||index==0 ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white' : 'text-slate-500 border-slate-300'} border-[2px] w-10 h-10 flex justify-center items-center rounded-full`}>
              {el.label}
            </span>
          {index !== 2 && (
            <div className="w-[50px] h-[50px] flex items-center justify-center">
              <Progress
                size="sm"
                radius="sm"
                orientation="vertical"
                className="rotate-90 w-[90px]"
                classNames={{
                  track: "drop-shadow-md border border-default",
                  indicator: "bg-gradient-to-r from-blue-500 to-pink-500",
                  label: "tracking-wider font-medium text-default-600",
                  value: "text-foreground/60",
                }}
                value={el.value}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default App;
