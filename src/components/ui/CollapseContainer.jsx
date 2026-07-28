import { AnimatePresence, motion } from "motion/react";

export function CollapseContainer({isActive, children}) {
  return (
    <AnimatePresence initial={false}>
        {isActive && (
          <motion.div
            className="overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            {children}
          </motion.div>
        )}
    </AnimatePresence>
  )
}