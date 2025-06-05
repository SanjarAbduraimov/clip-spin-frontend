import { services } from "@/modules/service/services";
import { ServiceCard } from "@/modules/service/ui/ServiceCard";

export const ServicesList = () => {
  return (
    <section>
      <div className="flex items-baseline justify-between">
        <h2 className="mb-4 text-2xl font-bold">Services</h2>
        {/* <div>
          <Button
            variant="link"
            size="link"
            iconRight={<ArrowRight size={16} />}
          >
            Browse all
          </Button>
        </div> */}
      </div>

      <div className="-my-4 flex gap-4 overflow-x-auto py-4 [&>div]:w-[250px] [&>div]:shrink-0">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </section>
  );
};
