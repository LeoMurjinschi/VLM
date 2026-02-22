import {STATS} from '../../data/mockData';

const StatsSection = () => {
  return (
    <section className="bg-blue-600 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center md:text-left">
          {STATS.map((stat, index) => (
            <div 
              key={stat.id} 
              className={`flex flex-col md:flex-row items-center md:items-start gap-4 ${
                index !== STATS.length - 1 ? 'lg:border-r lg:border-blue-500' : ''
              }`}
            >
              <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                <stat.icon size={28} className="text-white"/>
              </div>
              
              <div className="flex flex-col items-center md:items-start">
                <p className="text-3xl font-black text-white tracking-tight mb-1">
                  {stat.value}
                </p>
                <p className="text-sm font-bold text-blue-100 uppercase tracking-wider mb-1">
                  {stat.label}
                </p>
                <p className="text-xs text-blue-200 font-medium max-w-[150px] text-center md:text-left">
                  {stat.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;