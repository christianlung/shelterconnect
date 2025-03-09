'use client';
import { Sheet, SheetRef } from 'react-modal-sheet';
import { PropsWithChildren, useCallback, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';

interface PinnedBottomSheetProps {
  className?: string;
}

const springConfig = {
  type: 'spring',
  stiffness: 500,
  damping: 15,
  mass: 1,
  velocity: 2,
};

/**
 * A bottom sheet that remains open on the screen.
 * Will snap close to the bottom of the screen without closing.
 */
const PinnedBottomSheet = function PinnedBottomSheet(
  props: PropsWithChildren<PinnedBottomSheetProps>,
) {
  const { children, className } = props;
  const sheetRef = useRef<SheetRef>(null);
  const [isTopSnap, setIsTopSnap] = useState(false);

  const handleSnap = useCallback((index: number) => {
    setIsTopSnap(index === 0);
  }, []);

  const toggleSheet = useCallback(() => {
    if (isTopSnap) {
      sheetRef.current?.snapTo(snapPoints.length - 1);
    } else {
      sheetRef.current?.snapTo(0);
    }
  }, [isTopSnap]);

  return (
    <Sheet
      ref={sheetRef}
      isOpen
      onClose={() => sheetRef.current?.snapTo(snapPoints.length - 1)}
      snapPoints={snapPoints}
      initialSnap={initialSnap}
      style={{ zIndex: 40 }}
      onSnap={handleSnap}
      detent="content-height"
    >
      <Sheet.Container>
        <Sheet.Header className={`shadow-sm ${className}`}>
          <div className="flex w-full flex-col items-center">
            <motion.div
              className={`my-3 h-1 w-12 rounded-full transition-colors md:hidden ${isTopSnap ? 'bg-primary-500' : 'bg-gray-300'}`}
              animate={{
                scale: isTopSnap ? 1.2 : 1,
              }}
              transition={springConfig}
            />
            <motion.button
              onClick={toggleSheet}
              className="hidden w-full justify-center py-3 text-gray-400 transition-colors hover:text-gray-600 md:flex"
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
            >
              <motion.div
                animate={{
                  rotate: isTopSnap ? 180 : 0,
                  y: isTopSnap ? -4 : 4,
                  scale: isTopSnap ? 1.2 : 1,
                }}
                transition={springConfig}
                className="text-primary-500"
              >
                <FontAwesomeIcon icon={faChevronUp} size="lg" />
              </motion.div>
            </motion.button>
          </div>
        </Sheet.Header>
        <Sheet.Content className={`${className}`}>
          <Sheet.Scroller>
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 40 }}
                transition={springConfig}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </Sheet.Scroller>
        </Sheet.Content>
      </Sheet.Container>
      <motion.div
        className="fixed inset-0 bg-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: isTopSnap ? 0.05 : 0 }}
        transition={springConfig}
      />
    </Sheet>
  );
};

const snapPoints = [0.9, 0.1];
const initialSnap = 1;

export default PinnedBottomSheet;
