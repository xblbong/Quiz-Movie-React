import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <div>
       {/* Footer Credit */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-8 text-xs text-text-muted/60 font-medium"
        >
          © 2026 Cinema Quiz • Made Sabilah Mudrikah
        </motion.p>
    </div>
  )
}
